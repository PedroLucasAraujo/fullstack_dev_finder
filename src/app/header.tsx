"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" /> Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className=" light:bg-gray-100 dark:bg-gray-900 container mx-auto py-2">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl transition hover:underline"
        >
          <Image
            src="/icon.png"
            width="60"
            height="60"
            alt="The application icon of a magnifying glass"
          />
          DevFinder
        </Link>

        <div className="flex items-center gap-4">
          <AccountDropdown />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
