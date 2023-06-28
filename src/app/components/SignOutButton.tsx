"use client";
import { FC, useState } from "react";
import Button from "@/app/components/ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/Toast";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      toast({
        title: "Error signing out",
        message: "Please try again",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signOutUser} isLoading={isLoading}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
