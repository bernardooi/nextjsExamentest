import Navbar from "@/components/Navbar";
import { api } from "@/utils/api";

interface Student {
  id: number;
  firstName: string;
  program: string;
  subjects: {
    name: string;
    grade: string;
  }[];
}

export default function ListPage() {
  const getAllstudents = api.student.getAllStudents.useQuery();

  const students = getAllstudents.data;

  const coreSubjects = (program: string) => {
    if (program === "TEK") {
      return [
        "Matematik 1c",
        "Svenska 1",
        "Svenska 2",
        "Svenska 3",
        "Engelska 5",
        "Engelska 6",
      ];
    } else if (program === "DE") {
    } else if (program === "EL") {
    }
  };
  const countFailsAndPasses = (
    subjects: { name: string; grade: string }[],
    coreSubj: string[]
  ) => {
    let passCount = 0;
    let failCount = 0;

    subjects.forEach((subject) => {
      if (subject.grade === "F" || coreSubj.includes(subject.name)) {
        failCount++;
      } else {
        passCount++;
      }
    });

    return { passCount, failCount };
  };
  return (
    <>
      <Navbar />

      <div className="NTI-backdrop"></div>
      <div className="NTI-background">
        <div className="list-cont">
          <div className="list-cat-cont">
            <a className="list-cats" href="#">
              Students
            </a>
            <a className="list-cats" href="#">
              Classes
            </a>
          </div>
          <div className="list-boxes">
            <div className="list-1">
              <table>
                <tbody>
                  <tr className="table-header">
                    <th className="name">Name</th>
                    <th className="program">Program</th>
                    <th className="pass">G</th>
                    <th className="fail">IG</th>
                    <th className="examen">Examen</th>
                  </tr>
                </tbody>
              </table>
              <div className="line-break"></div>
              <table>
                <tbody className="table-stud-content">
                  {students?.map((data) => {
                    const coreSubj = coreSubjects(data.program);
                    const { passCount, failCount } = countFailsAndPasses(
                      data.subjects,
                      coreSubj
                    );

                    return (
                      <tr key={data.id}>
                        <td className="name">{data.firstName}</td>
                        <td className="program">{data.program}</td>
                        <td className="pass">{passCount}</td>
                        <td className="fail">{failCount}</td>
                        <td className="examen"></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="list-2">
              <div>
                <p className="pro-text">Examensgrad:</p>
                <p className="pro-percent">--%</p>
                <br />
                <p className="pro-stat">Passed: </p>
                <p className="pro-stat">Failed: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
