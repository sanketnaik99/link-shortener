import Image from "next/image";

// Components
import { LinkShortenerForm } from "./components/link-shortener-form";

export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 space-y-4">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Shorten your links
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Turn long URLs into short, easy-to-share links. Enter your URL
              below to get started.
            </p>
          </div>
          <LinkShortenerForm />
        </div>
      </div>
    </section>
  );
}
