import { readKV } from "../../kv/read";

export const runtime = "edge";
export const fetchCache = "force-no-store";

export async function GET(
  request: Request,
  { params }: { params: { hashedValue: string } },
) {
  const { hashedValue } = params;

  console.log("hashedValue", hashedValue);

  const kvValue = await readKV({
    namespace: "URLS_KV",
    key: hashedValue,
  });

  console.log("kvValue", kvValue);

  if (kvValue) {
    return new Response(JSON.stringify({ url: kvValue }));
  }

  return new Response(null, { status: 404 });
}
