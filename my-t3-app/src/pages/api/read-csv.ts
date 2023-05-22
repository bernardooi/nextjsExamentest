// import { type NextApiRequest, type NextApiResponse } from "next";
// import csv from "csv-parser";
// import fs from "fs";

// export default function readCSV(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): void {
//   const file = req.body;
//   fs.createReadStream(file.path)
//     .pipe(csv())
//     .on("data", (row) => {
//       console.log(row);
//     });

  // console.log(req.body);
  // const { file } = req?.body as { file: File };
  // console.log(file);
  // file
  // res.send({});
}
