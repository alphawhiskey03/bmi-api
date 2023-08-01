import type { Metadata } from "next";
import Link from "next/link";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Image from "next/image";

export const metadata: Metadata = {
  title: "THA | Home",
  description: "Open source vital health Api",
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
            Vital Health
            <br /> Analytics API
          </LargeHeading>
          <Paragraph className="max-w-xl lg:text-left">
            Integrate precise BMI, body type, BMR, and TDEE calculations.
            Support users on their wellness journey with comprehensive health
            analytics.{" "}
            <Link
              href="/documentation"
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              Learn more
            </Link>
            <br />
            <Link
              href="/login"
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              Get your API Key
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
