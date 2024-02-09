// Bindings
import { KV_BINDINGS } from "./bindings";

// Types
import { KVNamespace } from "@cloudflare/workers-types";

interface KVWrite {
  key: string;
  namespace: string;
  value: string;
}

/**
 * Writes a value to a Cloudflare KV namespace.
 * @param namespace - The namespace to write the value to.
 * @param key - The key of the value to write.
 * @param value - The value to write.
 * @returns A Promise that resolves to a string or null.
 */
export const writeKV = async ({
  namespace,
  key,
  value,
}: KVWrite): Promise<string | null> => {
  if (process.env.NODE_ENV === "development") {
    const form = new FormData();
    form.append("metadata", "");
    form.append("value", value);
    const nameSpaceID = KV_BINDINGS[namespace];
    const accountID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${nameSpaceID}/values/${key}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
      },
      body: value,
    };
    const response = await fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });
    return response;
  } else {
    const KVNamespace = process.env[namespace] as any as KVNamespace;
    await KVNamespace.put(key, value);
    return "true";
  }
};
