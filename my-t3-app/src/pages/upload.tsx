import { getServerSession } from "next-auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { redirectToLogin } from "@/utils/redirects";
import { authOptions } from "@/server/auth";
import Navbar from "@/components/Navbar";

export default function UploadFile() {
  return (
    <>
      <Navbar />
      <form action="">
        <input type="file" name="" id="" />
        <button type="submit">Submit</button>
      </form>
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
