import Link from "next/link";
import { SignOutButton } from "./sign-out-button";
import { getServerSession } from "next-auth";

export const Header = async () => {
  const session = await getServerSession()

  return (
    <header className="fixed top-0 w-full h-20 flex items-center bg-amber-950 text-slate-50">
      <nav className="w-11/12 flex items-center justify-between m-auto max-w-screen-xl">
        <Link href="/">Logo</Link>
        <ul className="flex items-center gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/public">Public</Link>
          </li>
          <li>
            <Link href="/private">Private</Link>
          </li>
          {!!session && <li><SignOutButton/></li>}
        </ul>
      </nav>
    </header>
  );
};
