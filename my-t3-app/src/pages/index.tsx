import Navbar from "@/components/Navbar";
import { authOptions } from "@/server/auth";
import { redirectToLogin } from "@/utils/redirects";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
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
