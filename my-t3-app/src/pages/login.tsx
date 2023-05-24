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

      <div className="NTI-backdrop"></div>
      <div className="NTI-background">
        <div id="form-cont">
          <div id="login-form">
            <img
              src="images/nti-logo.png"
              alt="nti logo"
              id="form-logo"
              className="inputs"
            />

            <form id="form-box" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box inputs">
                <label>Email: </label>
                <input
                  type="email"
                  id="email"
                  className="form-input "
                  {...register("email")}
                />
              </div>
              <button
                type="submit"
                value="LOGIN"
                id="form-submit"
                className="inputs"
              >
                Submit
              </button>
            </form>

            <h2 className="or-header">Or Connect With</h2>

            <button
              className="github-input inputs"
              onClick={() => signIn("github")}
            >
              {" "}
              <img
                className="github-input-img"
                src="images/github-logo.png"
                alt="github"
              />{" "}
              Github
            </button>
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

  if (session) {
    return redirectToHome;
  }

  return {
    props: {
      session,
    },
  };
};
