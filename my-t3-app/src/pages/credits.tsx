import Navbar from "@/components/Navbar";
import { authOptions } from "@/server/auth";
import { redirectToLogin } from "@/utils/redirects";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

export default function HomePage() {



  return (
    <>
      <Navbar />

      <div className="NTI-backdrop"></div>
      <div className="NTI-background">
        <div className="cred-roll">
            <div className="creds">
                <h2 id="cred-head">Developers</h2>
                <br />
                <h3 className="cred-names">Kenji Sakurai</h3>
                <h3 className="cred-names">Bernard Ooi</h3>
                <br /> <br /><br />

                <h2 id="cred-head">Back-end Developer</h2>
                <br />
                <h3 className="cred-names">Bernard Ooi</h3>
                <br /> <br /><br />

                <h2 id="cred-head">Designer</h2>
                <br />
                <h3 className="cred-names">Kenji Sakurai</h3>
                <br /> <br /><br />
                <h2 id="cred-head">Special Thanks</h2>
                <br />
                <h3 className="cred-names">StackOverflow</h3>
                <h3 className="cred-names">ChatGPT</h3>
            </div>
        </div>
      </div>

    </>

  );
}
