"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectPage({ params }: { params: { shortenedURL: string } }) {
  const { shortenedURL } = params;
  const isWindowDefined = typeof window !== "undefined";
  const router = useRouter();

  const getRedirectUrl = async (shortenedURL: string) => {
    const data = await fetch(`/api/get-link/${shortenedURL}`)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    if (data && data.url) {
      window.location.href = data.url;
    } else {
      router.push("/404");
    }
  };

  useEffect(() => {
    if (shortenedURL) {
      getRedirectUrl(shortenedURL);
    }
  }, [shortenedURL, isWindowDefined]);

  return null;
}

export default RedirectPage;
