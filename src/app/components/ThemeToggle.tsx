"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Button from "@/app/components/ui/Button";
import Icon from "@/components/Icons";

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icon.Sun
            className="rotate-0 
            scale-100
            transition-all
          hover:text-slate-900
            dark:-rotate-90
            dark:scale-0
          dark:text-slate-400
          dark:hover:text-slate-100"
          />
          <Icon.Moon
            className="absolute 
            rotate-90 
            scale-0 
            transition-all 
          hover:text-slate-900 
            dark:rotate-0 
            dark:scale-100 
          dark:text-slate-400 
          dark:hover:text-slate-100"
          />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icon.Sun className="mr-4 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icon.Moon className="mr-4 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icon.Laptop className="mr-4 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ThemeToggle;
