import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceHero = ({
  title,
  subtitle,
  backgroundImage,
  icon: Icon,
  breadcrumbs = [],
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const overlayRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { y: 100, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 50, opacity: 0 });
      gsap.set(iconRef.current, { scale: 0, rotation: -180 });
      gsap.set(breadcrumbRef.current, { y: 30, opacity: 0 });
      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "top" });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Reveal animation
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1,
        ease: "power3.inOut",
      })
        .to(
          iconRef.current,
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          breadcrumbRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Floating particles animation
      particlesRef.current.forEach((particle, index) => {
        if (!particle) return;
        gsap.to(particle, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });

      // Parallax on scroll
      gsap.to(contentRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80" />

      {/* Animated Reveal Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gray-900 z-20"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Breadcrumbs */}
        <nav ref={breadcrumbRef} className="mb-8">
          <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        {/* Icon */}
        {Icon && (
          <div
            ref={iconRef}
            className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-orange-500 rounded-2xl mb-8 shadow-2xl"
          >
            <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
        )}

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
