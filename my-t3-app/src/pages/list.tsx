import Navbar from "@/components/Navbar";
import { authOptions } from "@/server/auth";
import { api } from "@/utils/api";
import { redirectToLogin } from "@/utils/redirects";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

interface Student {
  id: number;
  firstName: string;
  program: string;
  subjects: {
    name: string;
    grade: string;
    points: string;
  }[];
}

export default function ListPage() {
  const getAllstudents = api.student.getAllStudents.useQuery();
  const programSubjects = {
    TEK: [
      "Matematik 1c",
      "Svenska 1",
      "Svenska 2",
      "Svenska 3",
      "Engelska 5",
      "Engelska 6",
      "Gymnasiearbete",
    ],
    DE: [
      "Matematik 1c",
      "Svenska 1",
      "Svenska 2",
      "Svenska 3",
      "Engelska 5",
      "Engelska 6",
      "Gymnasiearbete",
    ],
    EL: ["Matematik 1a", "Svenska 1", "Engelska 5", "Gymnasiearbete"],
  };
  const students = getAllstudents.data;

  const coreSubjects = (program: string): string[] => {
    if (program === "TEK") {
      return programSubjects.TEK;
    } else if (program === "DE") {
      return programSubjects.DE;
    } else if (program === "EL") {
      return programSubjects.EL;
    } else {
      return [];
    }
  };
  const countFailsAndPasses = (
    subjects: { subject: string; grade: string; points: string }[],
    coreSubj: string[]
  ) => {
    let passCount = 0;
    let failCount = 0;
    let coreFailCount = 0;
    let failedSubjectsPoints = 0;

    subjects.forEach((subject) => {
      if (subject.grade === "F") {
        console.log(subject.points);
        failedSubjectsPoints += Number(subject.points);
        console.log(failedSubjectsPoints);
        failCount++;

        if (coreSubj.includes(subject.subject)) {
          console.log(subject.subject);

          coreFailCount++;
        }
      } else {
        passCount++;
      }
    });

    return { passCount, failCount, coreFailCount, failedSubjectsPoints };
  };
  const isFailed = (coreFailCount: number, failedSubjectsPoints: number) =>
    coreFailCount > 0 || failedSubjectsPoints > 250;

  const countFailedStudents = (students: Student[]) => {
    let failedStudentCount = 0;
    let passedStudentCount = 0;
    if (students) {
      students.forEach((student) => {
        const coreSubj = coreSubjects(student.program);
        const { coreFailCount, failedSubjectsPoints } = countFailsAndPasses(
          student.subjects,
          coreSubj
        );

        if (isFailed(coreFailCount, Number(failedSubjectsPoints))) {
          failedStudentCount++;
        } else {
          passedStudentCount++;
        }
      });
    }
    return { failedStudentCount, passedStudentCount };
  };

  const { failedStudentCount, passedStudentCount } =
    countFailedStudents(students);

  const percentageCalculator = () => {
    const totalStudents = failedStudentCount + passedStudentCount;
    const percentage = (passedStudentCount / totalStudents) * 100;
    return percentage.toFixed(1) ;
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
                    const {
                      passCount,
                      failCount,
                      coreFailCount,
                      failedSubjectsPoints,
                    } = countFailsAndPasses(data.subjects, coreSubj);
                    const failed = isFailed(
                      coreFailCount,
                      Number(failedSubjectsPoints)
                    );

                    return (
                      <tr key={data.id}>
                        <td className="name">{data.firstName}</td>
                        <td className="program">{data.program}</td>
                        <td className="pass">{passCount}</td>
                        <td className="fail">{failCount}</td>
                        <td className="examen">{failed ? "F" : "G"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="list-2">
              <div>
                <p className="pro-text">Examensgrad:</p>
                <p className="pro-percent">{percentageCalculator()}%</p>
                <br />
                <p className="pro-stat">Passed:{passedStudentCount}</p>
                <p className="pro-stat">Failed:{failedStudentCount}</p>
              </div>
            </div>
          </div>
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
