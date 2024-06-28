import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GithubIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
  return (
    <header className="backdrop-blur sticky top-0 z-40 w-full h-[80px] flex justify-center items-center border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <a
              href="https://github.com/MasabBinZia/VotePulse."
              target="_blank"
              className={cn(
                buttonVariants({ size: "icon" }),
                "w-10 h-10 p-1 rounded-full"
              )}
            >
              <GithubIcon className="" />
            </a>
            <ProfileMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="lg:mb-2.5">
        <span className="inline-block text-2xl lg:text-4xl font-bold text-primary">
          VotePulse.
        </span>
      </a>
      <nav className="gap-6 hidden lg:flex">
        <a
          key={""}
          href={"/candidates"}
          className={"flex items-center text-lg font-medium "}
        >
          Candidates
        </a>
        <a
          key={""}
          href={"/votes"}
          className={"flex items-center text-lg font-medium "}
        >
          Votes
        </a>
      </nav>
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/Providers/AuthProvider";

function ProfileMenu() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/profile">Profile</a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
