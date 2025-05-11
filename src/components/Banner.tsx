// src/components/Banner.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Banner() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const darkSection = document.querySelector('[data-theme="dark"]');
    if (darkSection) observer.observe(darkSection);

    return () => {
      if (darkSection) observer.unobserve(darkSection);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-[0.5rem] right-[0.5rem] py-[0.5rem] flex justify-between items-center z-50 transition-colors duration-300 ${
        isDark ? "text-white" : "text-black"
      }`}
      style={{ height: "3.625rem" }}
    >
      <Link href="/" className="font-normal">K WU</Link>
      <nav>
        <ul className="flex space-x-6 list-none m-0 p-0">
          <li>
            <Link href="/projects" className="font-normal after:content-[','] after:inline-block after:mr-[0.375rem]">
              Project
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-normal">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
