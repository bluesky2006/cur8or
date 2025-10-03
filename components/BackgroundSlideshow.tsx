"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/art-backgrounds/1.jpg",
  "/art-backgrounds/2.jpg",
  "/art-backgrounds/3.jpg",
  "/art-backgrounds/4.jpg",
  "/art-backgrounds/5.jpg",
  "/art-backgrounds/6.jpg",
];

export default function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * images.length));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={`${src}-${i === index}`}
          className={`absolute inset-0 transition-opacity duration-[4000ms] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={i === index ? { animation: "kenburns 40s forwards" } : {}}
        >
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      ))}

      {/* subtle overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      <style jsx global>{`
        @keyframes kenburns {
          from {
            transform: scale(1) translate(0, 0);
          }
          to {
            transform: scale(1.13) translate(-2%, -2%);
          }
        }
      `}</style>
    </div>
  );
}
