"use client";
import { FC, useState } from "react";
import Button, { buttonVariants } from "@/app/components/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/Toast";
import Icons from "./Icons";

interface SignInButtonProps {
  variant: "default" | "outline" | "ghost" | "link";
}

const SignInButton: FC<SignInButtonProps> = ({ variant }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (err) {
      toast({
        title: "Error signing in",
        message: "Please try again later",
        type: "error",
      });
    }
  };
  return (
    <Button variant={variant} onClick={signInWithGoogle} isLoading={isLoading}>
      <Icons.LogIn className="p-1" />
      <span>Sign in</span>
    </Button>
  );
};

export default SignInButton;
