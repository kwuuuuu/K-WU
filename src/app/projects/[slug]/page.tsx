// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchSanityData, urlFor } from "@/lib/sanity";
import BackToTopButton from "@/components/BackToTopButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage(props: Props) {
  const { slug } = await props.params;

  const data = await fetchSanityData<any>(
    `*[_type == "project" && slug.current == "${slug}"][0]{
      title,
      story,
      type,
      year,
      location,
      photographer,
      scale,
      images[]{asset->{_id, url, metadata}}
    }`
  );
  if (!data) return notFound();

  const {
    title,
    story,
    type,
    year,
    location,
    photographer,
    scale,
    images = [],
  } = data;

  return (
    <div className="w-full px-[0.5rem] md:px-[2rem]">
      <div className="pt-[1rem] pb-[6rem]">
        <p className="font-normal">{title}</p>
        <div className="mt-[0.5rem] whitespace-pre-line leading-[1.2]">
          {story}
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        {images.map((img: any, i: number) => (
          <div
            key={img.asset._id}
            className="w-full"
            style={{ minHeight: "80vh" }}
          >
            <Image
              src={urlFor(img.asset).url()}
              alt={`Project image ${i + 1}`}
              width={img.asset.metadata.dimensions.width}
              height={img.asset.metadata.dimensions.height}
              className="w-full h-auto object-contain"
              quality={100}
              priority
            />
          </div>
        ))}
      </div>

      <div className="mt-[6rem] mb-[8rem] grid grid-cols-[auto_1fr] gap-x-[3rem] gap-y-[0.5rem]">
        {year && (
          <>
            <span className="font-normal">Year</span>
            <span>{year}</span>
          </>
        )}
        {type && (
          <>
            <span className="font-normal">Type</span>
            <span>{type}</span>
          </>
        )}
        {scale && (
          <>
            <span className="font-normal">Scale</span>
            <span>{scale}</span>
          </>
        )}
        {location && (
          <>
            <span className="font-normal">Location</span>
            <span>{location}</span>
          </>
        )}
        {photographer && (
          <>
            <span className="font-normal">Photography</span>
            <span>{photographer}</span>
          </>
        )}
      </div>

      <BackToTopButton />
    </div>
  );
}
