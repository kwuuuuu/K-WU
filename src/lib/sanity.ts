// src/lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: "07ls55uq",
  dataset: "production",
  apiVersion: "2023-08-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
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
