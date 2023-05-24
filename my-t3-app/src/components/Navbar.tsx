import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <>
      <div className="navbar">
        <h2 className="login-name" style={{ display: "inline" }}>
          {session ? session.user.name : null}
        </h2>

        <Link className="nav-btn nav-1" href="/"> Home </Link>
        <Link className="nav-btn nav-2" href="/register"> Register </Link>
        <Link className="nav-btn nav-3" href="/list"> View List </Link>
        <Link className="nav-btn nav-4" href="/about"> About </Link>

        <button className="nav-btn nav-5" onClick={() => {session ? void signOut() : window.location.replace("/login");}}>
          {session ? "logout" : "login"}
        </button>
      </div>
    </>
  );
}
