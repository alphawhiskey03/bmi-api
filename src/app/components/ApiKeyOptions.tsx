"use client";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "./ui/Toast";
import { createApiKey } from "@/helpers/create-api-key";
import { useRouter } from "next/navigation";
import { revokeAPIKey } from "@/helpers/revoke-api-key";

interface ApiKeyOptionsProps {
  apiId: string;
  apiKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiId, apiKey }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const router = useRouter();

  const createNewAPIKey = async () => {
    try {
      setIsCreating(true);
      await revokeAPIKey({ keyId: apiId });
      await createApiKey();
      router.refresh();
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast({
          title: "Error creating a key",
          message: "Please try again later.",
          type: "error",
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  const revokeCurrentAPIKey = async () => {
    setIsRevoking(true);
    try {
      await revokeAPIKey({ keyId: apiKey });
      router.refresh();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error revoking a key",
        message: "Please tye again later.",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>
            {isCreating
              ? "Is creating"
              : isRevoking
              ? "is revoking"
              : "Options"}
          </p>
          {isCreating || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast({
              title: "Copied",
              message: "API key copied to clipboard",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewAPIKey}>
          Create new key
        </DropdownMenuItem>

        <DropdownMenuItem onClick={revokeCurrentAPIKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
