import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="backdrop-blur sticky top-0 z-40 w-full h-[80px] flex justify-center items-center border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <a href="/login" className={cn(buttonVariants({ size: "icon" }))}>
              G
            </a>
            <a href="/login" className={cn(buttonVariants({ size: "icon" }))}>
              L
            </a>
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
        <span className="inline-block text-2xl lg:text-4xl font-bold">
          VotePulse.
        </span>
      </a>
      {/* <div className="md:hidden hidden lg:block">
          <NavMenu />
        </div> */}
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
          href={"/profile"}
          className={"flex items-center text-lg font-medium "}
        >
          Party
        </a>
        <a
          key={""}
          href={"/home"}
          className={"flex items-center text-lg font-medium "}
        >
          Votes
        </a>
      </nav>
    </div>
  );
}
