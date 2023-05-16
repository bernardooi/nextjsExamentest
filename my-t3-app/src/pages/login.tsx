import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { redirectToHome } from "@/utils/redirects";
import { authOptions } from "@/server/auth";
import Navbar from "@/components/Navbar";

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => signIn("email", { email: data.email });
  return (
    <>
      <Navbar />
      <form onSubmit={() => handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>or</p>
      <button onClick={() => signIn("github")}>Connect with Github</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return redirectToHome;
  }

  return {
    props: {
      session,
    },
  };
};
