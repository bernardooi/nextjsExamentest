import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const user = prisma.user.findMany({
      where: {},
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("username")} />
        <br />
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>
        Don&apos;t have an account? <Link href="/register">Sign up</Link>
      </p>
    </>
  );
}
