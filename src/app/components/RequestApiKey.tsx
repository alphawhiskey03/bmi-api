"use client";
import { FC, FormEvent, useState } from "react";
import { toast } from "./ui/Toast";
import { createApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import LargeHeading from "./ui/LargeHeading";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/ui/Input";

const RequestApiKey: FC = ({}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const generateApiKey = await createApiKey();
      setApiKey(generateApiKey);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          message: err.message,
          type: "error",
        });
        return;
      }
      toast({
        title: "Error",
        message: "Something wen't wrong",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading> Request your api key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API Key</Paragraph>
      </div>
      <form
        className="mt-6 sm:flex sm:items-center"
        onSubmit={createNewApiKey}
        action="#"
      >
        <div className="relative rounded-md shadow-md sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here"
          />
        </div>
        <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
