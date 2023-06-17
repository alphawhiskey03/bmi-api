import { FC } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { buttonVariants } from "@/app/components/Button";
import SiginInButton from "@/components/SiginButton";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/lib/auth";

interface NavbarProps {}
const Navbar: FC<NavbarProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div
      className="fixed
    backdrop-blur-sm
    bg-white/75
    dark:bg-slate-900/75
    z-50
    top-0
    left-0
    right-0
    h-20
    border-b
    border-slate-300
    dark:border-slate-700
    shadow-sm flex
    items-center
    justify-between"
    >
      <div className="container max-w-7xl mx-auto w-full flex justify-between">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          BMI app
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>
          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/dashboard"
              ></Link>
              <SignOutButton />
            </>
          ) : (
            <SiginInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
