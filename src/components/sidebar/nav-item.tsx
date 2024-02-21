"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface NavItemProps {
  title: string;
  icon: ElementType;
  href: string;
}

export function NavItem({ title, icon: Icon, href }: NavItemProps) {
  const pathName = usePathname();
  return (
    <Button
      variant="ghost"
      className={cn(
        "group flex w-full justify-start",
        pathName === href ? "bg-muted text-black" : "bg-transparent text-white",
      )}
      asChild
    >
      <Link href={href} className="flex items-center gap-2">
        <Icon
          size={16}
          className={cn(
            "group-hover:text-black",
            pathName === href ? "animate-bounce text-black" : "text-white",
          )}
        />{" "}
        {title}
      </Link>
    </Button>
  );
}
