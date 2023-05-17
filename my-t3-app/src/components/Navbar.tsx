import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();
  return (
    <div>
      <h2>{session ? session.data?.user.name : null}</h2>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/list">View List</Link>
      <Link href="/about">About</Link>
    </div>
  );
}
