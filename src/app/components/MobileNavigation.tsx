"use client";
import { FC, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import Icon, { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";
interface MobileNavigationProps {
  authButton: ReactNode;
}

const MobileNavigation: FC<MobileNavigationProps> = ({ authButton }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icon.Navigation />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" forceMount>
        <DropdownMenuItem
          className="flex justify-center gap-1"
          onClick={() => router.push("/dashboard")}
        >
          <Icons.LayoutDashboard />
          <span>Dashb</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-center gap-1"
          onClick={() => router.push("/documentation")}
        >
          <Icons.FileCode2 />
          <span>Docs</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {authButton}
          <span className="sr-only">Navigation dropdown</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavigation;
