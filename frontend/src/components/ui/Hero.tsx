import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function Hero() {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome To VotePulse.
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Our e-voting app ensures secure, easy voting from anywhere, bringing
          democracy directly to your fingertips.
        </p>
        <div className="space-x-4">
          <a href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Vote Now
          </a>
          <a
            href={""}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Admin Login
          </a>
        </div>
      </div>
    </section>
  );
}
