import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { redirectToLogin } from "@/utils/redirects";
import { authOptions } from "@/server/auth";
import { signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();
  return (
    <>
      <Navbar></Navbar>
      <button
        onClick={() => {
          {
            session ? void signOut() : window.open("/login");
          }
        }}
      >
        {session ? "logout" : "login"}
      </button>
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
