"use client";

import "./globals.css";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <div className="min-h-screen flex flex-col">
          <Banner />
          <main className="flex-1 pt-[3.625rem]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
