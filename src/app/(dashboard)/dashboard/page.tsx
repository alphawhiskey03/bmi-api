import { FC } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ApiDashboard from "@/app/components/ApiDashboard";
import RequestApiKey from "@/app/components/RequestApiKey";

export const metadata: Metadata = {
  title: "BMI API | Dashboard",
  description: "Free & open source BMI API",
};
const Page: FC = async ({}) => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });
  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apiKey ? <ApiDashboard /> : <RequestApiKey />}
    </div>
  );
};

export default Page;