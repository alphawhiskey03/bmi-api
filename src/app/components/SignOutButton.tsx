"use client";
import { FC, useState } from "react";
import Button from "@/app/components/ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/Toast";
import Icons from "@/components/Icons";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  variant: "outline" | "link" | "ghost" | "default";
}

const SignOutButton: FC<SignOutButtonProps> = ({ variant }) => {
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
    <Button variant={variant} onClick={signOutUser} isLoading={isLoading}>
      <Icons.LogOut />
      <span>Sign out</span>
    </Button>
  );
};

export default SignOutButton;
