"use client";

import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clipboard } from "lucide-react";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

const formSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(2, { message: "Please enter a valid URL" }),
});

export const LinkShortenerForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shortenedURL, setShortenedURL] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
    if (response) {
      setIsDialogOpen(true);
      console.log(response.url);
      setShortenedURL(response.url);
    }
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(window.location + "lnk/" + shortenedURL);
      toast({
        title: "Copied to clipboard!",
        description: "The shortened URL has been copied to your clipboard.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem copying the URL to your clipboard.",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-8 min-[400px]:flex-row"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your URL here..."
                    {...field}
                    className="min-w-80"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="h-10 min-w-[100px]" type="submit">
            Shorten URL!
          </Button>
        </form>
      </Form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-black">
                  Your shortened URL is:
                </p>
                <div className="flex w-full flex-row gap-4">
                  <p
                    className="w-full cursor-pointer rounded-md bg-gray-200 p-3"
                    onClick={() => copyToClipboard()}
                  >
                    {typeof window !== "undefined"
                      ? window.location + "lnk/" + shortenedURL
                      : shortenedURL}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard()}
                  >
                    <Clipboard />
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
