import fastHashCode from "fast-hash-code";
import { readKV } from "../kv/read";
import { writeKV } from "../kv/write";

export const runtime = "edge";
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  const data = await req.json();
  const { url } = data;
  console.log("url", url);
  const hashedURL = fastHashCode(url, { forcePositive: true });
  console.log("hashedURL", hashedURL);
  const kvValue = await readKV({
    namespace: "URLS_KV",
    key: String(hashedURL),
  });

  if (kvValue) {
    return new Response(JSON.stringify({ url: hashedURL }));
  }

  await writeKV({
    namespace: "URLS_KV",
    key: String(hashedURL),
    value: url,
  });

  return new Response(JSON.stringify({ url: hashedURL }));
}
