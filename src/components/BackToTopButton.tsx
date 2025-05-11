// src/components/BackToTopButton.tsx
"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[0.5rem] right-[0.5rem] bg-transparent font-normal text-black"
      style={{
        font: "inherit",
        border: "none",  
        outline: "none",  
        padding: 0,
        margin: 0,
        background: "none",
        cursor: "pointer"
      }}
    >
      back to top
    </button>
  );
}
