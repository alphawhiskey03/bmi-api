import { FC } from "react";

import type { Metadata } from "next";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import DocumentationTabs from "@/components/DocumentationTabs";
import "simplebar-react/dist/simplebar.min.css";

export const metadat: Metadata = {
  title: "BMI API | Documentation",
  description: "Open source BMI Api",
};

const Page: FC = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/bmi</Paragraph>
        <DocumentationTabs />
      </div>
    </div>
  );
};

export default Page;
