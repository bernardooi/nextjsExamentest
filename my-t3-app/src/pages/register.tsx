import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Papa from "papaparse";
import React, { useState } from "react";
import { type } from "os";

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  csvFile: z.custom<File>(),
});



type Csv = z.infer<typeof schema>;

export default function UploadFile() {
  const { register, handleSubmit } = useForm<Csv>();
  const [data, setData] = useState<any[]>([]);
  const onSubmit = async (data: Csv) => {
    const file: File = data.csvFile![0];

    console.log({ file });
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        console.log(result.data);
        setData(result.data);
      },
    });
  };

  // async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file: File = e.target.files![0];
  //   console.log({ file });
  //   let parsed = data;
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (result) => {
  //       console.log(result.data);
  //       setData(result.data);
  //     },
  //   });
  //   console.log({ parsed });
  // }

  
  return (
    <>
      <Navbar />

      <div className="NTI-backdrop"></div>
      <div className="NTI-background">

        <div className="drop-area">
          <form className="reg-file-form" onSubmit={handleSubmit(onSubmit)}>
            <input id="reg-file-input" type="file" {...register("csvFile")} required
              // onChange={handleFileChange}
            />
            <label htmlFor="reg-file-input" className="reg-file-label">Upload File</label>
            <h2 className="reg-file-display">image.jpg</h2>
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>

    </>
  );
  
}
