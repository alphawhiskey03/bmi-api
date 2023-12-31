import { FC } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { buttonVariants } from "@/app/components/ui/Button";
import Icons from "@/components/Icons";
import SignInButton from "@/app/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/lib/auth";
import MobileNavigation from "./MobileNavigation";

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
          The Health Api
        </Link>
        <div className="flex gap-3 md:hidden">
          <ThemeToggle />
          <div className="flex md:hidden">
            <MobileNavigation
              authButton={
                session ? (
                  <SignOutButton variant="ghost" />
                ) : (
                  <SignInButton variant="ghost" />
                )
              }
            />
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({
              variant: "ghost",
              className: "flex gap-1",
            })}
          >
            <Icons.FileCode2 />
            <span> Documentation</span>
          </Link>

          {session ? (
            <>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  className: "flex gap-1",
                })}
                href="/dashboard"
              >
                <Icons.LayoutDashboard />
                <span> Dashboard</span>
              </Link>
              <SignOutButton variant="outline" />
            </>
          ) : (
            <SignInButton variant="outline" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
