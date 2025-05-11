// src/lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: "07ls55uq", // Your Sanity Project ID
  dataset: "production",
  useCdn: true, // Edge cache for public data
  apiVersion: "2023-08-01", // Use a fixed API version
});

// Build Sanity Image URLs
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Fetch wrapper (typed safely, no TypeScript error)
export async function fetchSanityData<T>(query: string): Promise<T | null> {
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (err) {
    console.error("Failed to fetch from Sanity:", err);
    return null;
  }
}
