// src/lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: "07ls55uq",     // ← your project ID
  dataset: "production",      // ← your dataset
  apiVersion: "2023-08-01",   // ← lock to a fixed API date
  useCdn: true,               // ← set to `false` if you need fresh data
});

// URL builder for Sanity assets
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

/**
 * Simple wrapper for GROQ fetches
 * We cast the result to T instead of using a generic on .fetch()
 */
export async function fetchSanityData<T = any>(
  groqQuery: string
): Promise<T> {
  try {
    const data = await sanityClient.fetch(groqQuery);
    return data as T;
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    throw err;
  }
}
