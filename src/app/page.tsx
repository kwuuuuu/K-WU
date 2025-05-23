"use client";

import SlideshowClient from "@/components/SlideshowClient";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <SlideshowClient interval={7000} />
      </main>
    </div>
  );
}
