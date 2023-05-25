import Navbar from "@/components/Navbar";
import { api } from "@/utils/api";

export default function ListPage() {
  const getAllstudents = api.student.getAllStudents.useQuery();

  const students = getAllstudents.data;

  const coreSubjects = (program) => {
    if (program === "TEK") {
      return;
    } else if (program === "DE") {
    } else if (program === "EL") {
    }
  };
  const countFailsAndPasses = (subjects: unknown[]) => {
    const passCount = subjects.filter(
      (subject) => subject.grade !== "F"
    ).length;
    const failCount = subjects.filter(
      (subject) => subject.grade === "F"
    ).length;

    return { passCount, failCount };
  };
  return (
    <>
      <Navbar></Navbar>

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
                  </tr>
                </tbody>
              </table>
              <div className="line-break"></div>
              <table>
                <tbody className="table-stud-content">
                  {students?.map((data) => {
                    const { passCount, failCount } = countFailsAndPasses(
                      data.subjects
                    );

                    return (
                      <tr key={data.id}>
                        <td className="name">{data.firstName}</td>
                        <td className="program">{data.program}</td>
                        <td className="pass">{passCount}</td>
                        <td className="fail">{failCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="list-2">
              <p className="pro-text">Närhet till att inte ta examen</p>
              <p className="pro-percent">---%</p>
              <p className="pro-name">Knut </p>
              {/* <p className="pro-fail-header">Underkända kurser:</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
