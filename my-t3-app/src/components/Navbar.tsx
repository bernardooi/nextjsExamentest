import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LinkButton from "./buttons/LinkButtons";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const isActiveRoute = (pathname) => {
    return router.pathname === pathname;
  };

  return (
    <div className="navbar">
      <h2 className="login-name">
        {session
          ? session.user.name
            ? session.user.name
            : session.user.email?.split("@")[0]
          : null}
      </h2>
      <LinkButton href={"/"} name={"Home"} active={isActiveRoute("/")} />
      <LinkButton
        href={"/register"}
        name={"Register"}
        active={isActiveRoute("/register")}
      />
      <LinkButton
        href={"/list"}
        name={"View List"}
        active={isActiveRoute("/list")}
      />
      <LinkButton
        href={"/about"}
        name={"About"}
        active={isActiveRoute("/about")}
      />

      <button
        className="nav-btn nav-5"
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
