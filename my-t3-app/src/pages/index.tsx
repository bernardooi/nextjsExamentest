import Navbar from "@/components/navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <Link href="/login">Login</Link>
    </>
  );
}
