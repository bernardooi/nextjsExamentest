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

        <div id="home-select">
            <span className="btn-span">
                <div className="home-btn home1"><a className="home-btn-text" href="/register">Register</a><div className="btn-circle"></div></div>
            </span>
            <span className="btn-span">
                <div className="home-btn home2"><a className="home-btn-text" href="/list">View List</a><div className="btn-circle"></div></div>
            </span>
            <span className="btn-span">
                <div className="home-btn home3"><a className="home-btn-text" href="/about">About</a><div className="btn-circle"></div></div>
            </span>
            <span className="btn-span">
                <div className="home-btn home4"><a className="home-btn-text" href="/credits">Credits</a><div className="btn-circle"></div></div>
            </span>

            
            <div className="triangle-box">
                <div className="triangle"></div>
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
