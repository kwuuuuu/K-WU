"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      if (scrollY + windowHeight >= docHeight - 100) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className={`w-full px-[0.5rem] pt-[0.5rem] pb-[2rem] font-normal transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-start space-y-[0.25rem]">
        <p>
          K WU acknowledges the Traditional Owners and Custodians of the land on which we are located, the Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging. We acknowledge their ongoing connection to this Country.
        </p>
        <p>©2025</p>
      </div>
    </footer>
  );
}
