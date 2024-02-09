import fastHashCode from "fast-hash-code";
import { readKV } from "../kv/read";
import { writeKV } from "../kv/write";

export const runtime = "edge";

export async function POST(req: Request) {
  const data = await req.json();
  const { url } = data;

  const hashedURL = fastHashCode(url, { forcePositive: true });

  const kvValue = await readKV({
    namespace: "URLS_KV",
    key: String(hashedURL),
  });

  if (kvValue) {
    return new Response(String(hashedURL));
  }

  await writeKV({
    namespace: "URLS_KV",
    key: String(hashedURL),
    value: url,
  });

  return new Response(String(hashedURL));
}
