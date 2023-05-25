import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function HomePage() {



  
    return (
      <>
        <Navbar />


      <div className="NTI-backdrop"></div>
      <div className="NTI-background">
        <div className="list-cont">


          <div className="list-cat-cont">
            <a className="list-cats" href="#">Students</a>
            <a className="list-cats" href="#">Classes</a>
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
