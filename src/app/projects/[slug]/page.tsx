import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchSanityData, urlFor } from "@/lib/sanity";
import BackToTopButton from "@/components/BackToTopButton";

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchSanityData<any>(
    `*[_type == "project" && slug.current == "${params.slug}"][0]{
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
      {/* Title + Story */}
      <div className="pt-[1rem] pb-[6rem]">
        <p>{title}</p>
        <div className="mt-[0.5rem] whitespace-pre-line leading-[1.2]">
          {story}
        </div>
      </div>

      {/* Images */}
      <div className="flex flex-col">
        {images.map((img: any, i: number) => (
          <div
            key={img.asset._id}
            className="w-full px-[0.5rem] md:px-0 md:ml-[0.5rem] max-w-[2580px]"
          >
            <div className="relative w-full h-auto py-[0.25rem]">
              <Image
                src={urlFor(img.asset).url()}
                alt={`Project image ${i + 1}`}
                width={img.asset.metadata.dimensions.width}
                height={img.asset.metadata.dimensions.height}
                quality={100}
                className="w-full h-auto object-contain object-left max-h-[130vh]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="mt-[6rem] mb-[8rem] grid grid-cols-[auto_1fr] gap-x-[3rem] gap-y-[0.5rem]">
        {year && (
          <>
            <span>Year</span>
            <span>{year}</span>
          </>
        )}
        {type && (
          <>
            <span>Type</span>
            <span>{type}</span>
          </>
        )}
        {scale && (
          <>
            <span>Scale</span>
            <span>{scale}</span>
          </>
        )}
        {location && (
          <>
            <span>Location</span>
            <span>{location}</span>
          </>
        )}
        {photographer && (
          <>
            <span>Photography</span>
            <span>{photographer}</span>
          </>
        )}
      </div>

      <BackToTopButton />
    </div>
  );
}
