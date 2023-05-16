import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { redirectToLogin } from "@/utils/redirects";
import { authOptions } from "@/server/auth";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <Link href="/login">Login</Link>
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
