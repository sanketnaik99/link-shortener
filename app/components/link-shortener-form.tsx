"use client";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LinkShortenerForm = () => {
  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row">
      <Input
        className="min-w-[300px] flex-1"
        placeholder="Enter your URL"
        type="url"
      />
      <Button className="h-10 min-w-[100px]">Shorten URL</Button>
    </div>
  );
};
