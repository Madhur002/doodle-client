"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        className="dark:hidden flex"
        onClick={() => setTheme("dark")}
        size="icon"
      >
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>

      <Button
        className="hidden dark:flex"
      onClick={() => setTheme("light")} size="icon">
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </>
  );
}
