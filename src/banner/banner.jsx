import React, { useEffect, useState } from "react";
import bannerImage from "../assets/ideas-bg.jpg";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          zIndex: -1,
        }}
      >
        <div
          className="w-full h-full bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${bannerImage})`,
            transform: `translateY(${offsetY * 0.5}px)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))",
          }}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Ideas</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Where all our great things begin
        </p>
      </div>
    </div>
  );
};

export default Banner;
