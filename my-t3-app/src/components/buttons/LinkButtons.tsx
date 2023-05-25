import Link from "next/link";

type Props = {
  href: string;
  name: string;
  active?: boolean; // Added optional active prop
};
export default function LinkButton(props: Props) {
  const { href, name, active } = props;
  const className = active ? "nav-btn nav-1 active" : "nav-btn nav-1";
  return (
    <Link href={href} className={className}>
      {name}
    </Link>
  );
}
