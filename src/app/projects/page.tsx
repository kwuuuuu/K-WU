// src/app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchSanityData, urlFor } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  location: string;
  slug: { current: string };
  images: { asset: any }[];
}

export default async function ProjectsIndex() {
  const data = await fetchSanityData<{ projects: Project[] }>(
    `{
      "projects": *[_type == "project"] | order(publishedAt desc)[0...6]{
        _id,
        title,
        location,
        slug,
        images[]{asset->{_id, url, metadata}}
      }
    }`
  );

  if (!data || !data.projects || data.projects.length === 0) {
    return <div className="p-8 text-gray-500">No projects available.</div>;
  }

  return (
    <div className="w-full px-[0.5rem] md:px-[2rem]">
      <div className="grid grid-cols-12 gap-y-[4rem] pt-[2rem] pb-[20rem]">
        {data.projects.map((project) => {
          const firstImage = project.images?.[0]?.asset;
          const imageUrl = firstImage ? urlFor(firstImage).url() : null;

          return (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="col-span-12 md:col-span-6 lg:col-span-4 block max-w-[450px]"
            >
              <div className="w-full">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    width={firstImage.metadata.dimensions.width}
                    height={firstImage.metadata.dimensions.height}
                    className="w-full h-auto object-contain"
                    quality={100}
                  />
                )}

                <div className="flex justify-between pt-[0.25rem]">
                  <p>{project.title}</p>
                  <p>{project.location}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
