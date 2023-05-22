import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <h2 style={{ display: "inline" }}>
        {session ? session.user.name : null}
      </h2>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/list">View List</Link>
      <Link href="/about">About</Link>
      <button
        onClick={() => {
          {
            session ? void signOut() : window.open("/login");
          }
        }}
      >
        {session ? "logout" : "login"}
      </button>
    </div>
  );
}
