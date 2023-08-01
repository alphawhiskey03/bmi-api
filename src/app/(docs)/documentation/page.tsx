import { FC } from "react";
import type { Metadata } from "next";
import LargeHeading from "@/ui/LargeHeading";

import DocumentationTabs from "@/components/DocumentationTabs";
import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
  title: "THA | Documentation",
  description: "Open source vital health Api",
};

const page: FC = () => {
  return (
    <div className="container w-7xl mx-auto mt-12 pb-10">
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <LargeHeading>Making a request</LargeHeading>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
