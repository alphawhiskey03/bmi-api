"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FC } from "react";
import SimpleBar from "simplebar-react";
import Paragraph from "./ui/Paragraph";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import ReactHTMLParser from "react-html-parser";
import Code from "@/ui/Code";
import Documentation from "@/helpers/documentation-code";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Label,
} from "@/ui/DropdownMenu";
import Icons from "@/components/Icons";
import Button from "@/ui/Button";
interface DocumentationTabsProps {}

const DocumentationTabs: FC<DocumentationTabsProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams!.get("code");

  useEffect(() => {
    const validRoutes = ["bmi", "bmr"];

    if (!code || !validRoutes.includes(code!)) {
      router.push("/documentation?code=bmr");
    }
  }, [code, router]);

  if (!code) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <Label>Select API : </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size="sm">
              <Icons.ArrowDownUp className="p-1" /> {code}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuItem
              onClick={() => router.push("/documentation?code=bmi")}
            >
              bmi
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/documentation?code=bmr")}
            >
              bmr
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Paragraph>api/v1/{code}</Paragraph>
      <>{ReactHTMLParser(Documentation[code.toLowerCase()].description)}</>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="grow">
          <Tabs defaultValue="nodejs" className="max-w-2xl">
            <TabsList>
              <TabsTrigger value="nodejs">NodeJs</TabsTrigger>

              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="nodejs">
              <SimpleBar>
                <Code
                  language="javascript"
                  code={Documentation[code.toLowerCase()].code.nodejs}
                  show
                  animated
                />
              </SimpleBar>
            </TabsContent>
            <TabsContent value="python">
              <SimpleBar>
                <Code
                  language="python"
                  code={Documentation[code.toLowerCase()].code.python}
                  show
                  animated
                />
              </SimpleBar>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-[100%] md:w-[40%]">
          <Tabs defaultValue="response">
            <TabsList>
              <TabsTrigger value="response">Example response</TabsTrigger>
            </TabsList>
            <TabsContent value="response">
              <SimpleBar>
                <Code
                  language="json"
                  code={Documentation[code.toLowerCase()].response}
                  show
                  animated
                />
              </SimpleBar>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DocumentationTabs;
