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
import { useRouter } from "next/router";

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
  role: z.string(),
  program: z.string(),
  csvFile: z.custom<File>(),
  subjects: z.array(Subject),
  studentId: z.string(),
});

type Csv = z.infer<typeof schema>;

export default function UploadFile() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<Csv>();
  const createStudent = api.student.createStudent.useMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: Csv) => {
    console.log(data);

    const file: File = data.csvFile[0];
    const studentId = cuid(); // Generate unique student ID
    setValue("studentId", studentId); // Set the generated ID

    console.log(studentId);

    Papa.parse(file, {
      header: true,

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      complete: async (result) => {
        console.log(result.data);

        const { firstName, lastName, program, role, csvFile } = data;

        setLoading(true);
        try {
          const created = await createStudent.mutateAsync({
            studentId,
            firstName,
            lastName,
            role,
            program,
            subjects: result.data,
            csvFile,
          });
          if (created) {
            console.log("done");
            setLoading(false);
            await router.push("/list");
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
            <input type="text" value="student" {...register("role")} hidden />
            <h1 className="reg-form-h1">Register a Student</h1>

            <label htmlFor="F-name-inp" className="name-label">
              First Name:
            </label>
            <input
              type="text"
              id="F-name-inp"
              className="reg-input"
              {...register("firstName")}
            />
            <label htmlFor="L-name-inp" className="name-label">
              Last Name:
            </label>
            <input
              type="text"
              id="L-name-inp"
              className="reg-input"
              {...register("lastName")}
            />

            <select id="program-select" {...register("program")}>
              <option value="TEK">Teknikprogrammet</option>
              <option value="DE">Designprogrammet</option>
              <option value="EL">Elprogrammet</option>
            </select>

            <input
              id="reg-file-input"
              type="file"
              {...register("csvFile")}
              required
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
