// src/components/SlideshowClient.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor, fetchSanityData } from "@/lib/sanity";

interface ProjectSummary {
  _id: string;
  title: string;
  slug: { current: string };
  images: { asset: any }[];
}

interface SlideshowClientProps {
  interval: number;
}

export default function SlideshowClient({ interval }: SlideshowClientProps) {
  const [images, setImages] = useState<{ asset: any; slug: string }[]>([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchSanityData<{ heroProjects: ProjectSummary[] }>(
        `*[_type == "homePage"][0]{ heroProjects[]->{_id, title, slug, images} }`
      );
      if (data?.heroProjects) {
        const allImages = data.heroProjects.flatMap((project) =>
          project.images.map((img) => ({
            asset: img.asset,
            slug: project.slug.current,
          }))
        );
        setImages(allImages);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 600);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  const { asset, slug } = images[current];
  const imageUrl = urlFor(asset).auto("format").quality(100).url();

  return (
    <div className="w-full px-[0.5rem] md:px-0 md:ml-[0.5rem] max-w-[2580px]">
      <Link href={`/projects/${slug}`} className="block w-full">
        <div className="relative w-full h-auto py-[0.25rem]">
          <Image
            src={imageUrl}
            alt="Project Image"
            width={2580}
            height={1440}
            priority
            className="w-full h-auto object-contain object-left max-h-[130vh]"
            style={{
              opacity: fade ? 0 : 1,
              transition: "opacity 0.6s ease-in-out"
            }}
            sizes="100vw"
          />
        </div>
      </Link>
    </div>
  );
}
