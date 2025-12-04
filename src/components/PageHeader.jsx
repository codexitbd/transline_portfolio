import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PageHeader = ({ title, subtitle, backgroundImage }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial states
    gsap.set(imageRef.current, { scale: 1.2 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(titleRef.current, { y: 60, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 40, opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0 });

    // Animation sequence
    tl.to(imageRef.current, {
      scale: 1,
      duration: 1.8,
      ease: "power2.out",
    })
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 1,
        },
        0
      )
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.3
      )
      .to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        0.5
      )
      .to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.8
      );

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const containerHeight = containerRef.current?.offsetHeight || 0;

      if (scrollY <= containerHeight) {
        gsap.to(imageRef.current, {
          y: scrollY * 0.4,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Decorative Line */}
        <div
          ref={lineRef}
          className="w-16 sm:w-20 h-1 bg-orange-500 mb-6 origin-center"
        />

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            ref={subtitleRef}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
    </section>
  );
};

export default PageHeader;
