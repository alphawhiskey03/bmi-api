import { FC, ReactNode } from "react";
import Link from "next/link";
import LargeHeading from "@/app/components/ui/LargeHeading";
import Paragraph from "@/app/components/ui/Paragraph";
import Icons from "@/app/components/Icons";
import { buttonVariants } from "@/app/components/ui/Button";

const pages: FC = () => {
  return (
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center gap-3">
      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          className: "w-fit",
        })}
      >
        <Icons.ChevronLeft /> Back to Home
      </Link>
      <LargeHeading>Welcome back!</LargeHeading>
      <Paragraph>Sign in to continue</Paragraph>
    </div>
  );
};

export default pages;
