import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/list">View List</Link>
      <Link href="/about">About</Link>
    </div>
  );
}
