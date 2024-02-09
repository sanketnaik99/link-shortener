// Bindings
import { KV_BINDINGS } from "./bindings";

// Types
import { KVNamespace } from "@cloudflare/workers-types";

interface ReadKV {
  namespace: string;
  key: string;
}

/**
 * Reads a value from a Cloudflare KV namespace.
 * @param namespace - The name of the KV namespace.
 * @param key - The key of the value to read.
 * @returns A Promise that resolves to the value if found, or null if not found.
 */
export const readKV = async ({
  namespace,
  key,
}: ReadKV): Promise<string | null> => {
  if (process.env.NODE_ENV === "development") {
    const namespaceID = KV_BINDINGS[namespace];
    const accountID = process.env.CLOUDFLARE_ACCOUNT_ID;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (response?.errors) {
      return null;
    }
    return response;
  } else {
    const KVNamespace = process.env[namespace] as any as KVNamespace;
    const KVdata = await KVNamespace.get(key);
    return KVdata ?? null;
  }
};
