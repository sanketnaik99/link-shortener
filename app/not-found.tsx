// Libraries
import Link from "next/link";
import Image from "next/image";

// Components
import { Button } from "@/components/ui/button";

import NotFound from "../public/404.png";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 space-y-4">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Page Not Found
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Oops! It looks like you&apos;ve hit a dead end. The link you are
              trying to access may be expired or invalid.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Image
              alt="404 Error"
              className="h-64 w-64 object-contain"
              src={NotFound}
            />
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/">
              <Button className="h-10 min-w-[100px]">Go Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
