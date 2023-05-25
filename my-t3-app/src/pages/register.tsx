import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Papa from "papaparse";
import React, { useState } from "react";
import { api } from "@/utils/api";
import { getServerSession } from "next-auth";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { authOptions } from "@/server/auth";
import { redirectToLogin } from "@/utils/redirects";
import cuid from "cuid";

const gradeMapping = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
};
const Subject = z.object({
  points: z.string(),
  subject: z.string(),
  grade: z
    .string()
    .refine((value) => value in gradeMapping, {
      message: "Invalid grade value",
    })
    .transform((value) => gradeMapping[value]),
});

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  csvFile: z.custom<File>(),
  subjects: z.array(Subject),
  studentId: z.string(),
});

type Csv = z.infer<typeof schema>;

export default function UploadFile() {
  const { register, handleSubmit, setValue } = useForm<Csv>();
  const createStudent = api.student.createStudent.useMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: Csv) => {
    const file: File = data.csvFile[0];
    const studentId = cuid(); // Generate unique student ID
    setValue("studentId", studentId); // Set the generated ID

    console.log(studentId);

    Papa.parse(file, {
      header: true,

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      complete: async (result) => {
        console.log(result.data);

        const { firstName, lastName, csvFile } = data;

        setLoading(true);
        try {
          const created = await createStudent.mutateAsync({
            studentId,
            firstName,
            lastName,
            subjects: result.data,
            csvFile,
          });
          if (created) {
            console.log("done");
            setLoading(false);
          }
        } catch (error) {
          console.log(error);

          setLoading(false);
        }
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="NTI-backdrop"></div>
      <div className="NTI-background">
        <div className="drop-area">
          <form className="reg-file-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="F-name-inp" className="name-label">
              First Name:
            </label>
            <input
              type="text"
              name="F-name"
              id="F-name-inp"
              {...register("firstName")}
            />
            <label htmlFor="L-name-inp" className="name-label">
              Last Name:
            </label>
            <input
              type="text"
              name="L-name"
              id="L-name-inp"
              {...register("lastName")}
            />

            <input
              id="reg-file-input"
              type="file"
              {...register("csvFile")}
              required
              accept=".csv"
            />
            <label htmlFor="reg-file-input" className="reg-file-label">
              Upload File
            </label>
            <h2 className="reg-file-display">image.jpg</h2>
            <button type="submit" className="reg-sub">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return redirectToLogin;
  }

  return {
    props: {
      session,
    },
  };
};
