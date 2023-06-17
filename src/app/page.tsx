import type { Metadata } from "next";
import Link from "next/link";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BMI Api | Home",
  description: "Open source BMI Api",
};
export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full">
        <div className="h-full flex flex-col gap-6 justify-start lg:justify-center items-center lg:items-start">
          <LargeHeading
            size="lg"
            className="three-d text-black dark:text-light-gold"
          >
            Easily determine <br />
            BMI and body type
          </LargeHeading>
          <Paragraph className="max-w-xl lg:text-left">
            With the BMI API, you can easily determine your Body type{" "}
            <Link
              href="/login"
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              API Key
            </Link>
          </Paragraph>
          <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute flex items-center justify-center">
            <Image
              priority
              className="img-shadow"
              quality={100}
              width={400}
              height={400}
              src="/bmi-icon.png"
              alt="typewriter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
