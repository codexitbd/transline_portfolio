import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CertificationsMarquee = () => {
  const sectionRef = useRef(null);
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);
  const headingRef = useRef(null);

  const certifications = [
    {
      name: "ISO 9001:2015",
      subtitle: "Quality Management System",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/ISO_Logo_%28Red_square%29.svg/1200px-ISO_Logo_%28Red_square%29.svg.png",
    },
    {
      name: "ISO 14001",
      subtitle: "Environmental Management",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/ISO_Logo_%28Red_square%29.svg/1200px-ISO_Logo_%28Red_square%29.svg.png",
    },
    {
      name: "AEO Certified",
      subtitle: "Authorized Economic Operator",
      logo: "https://www.wcoomd.org/-/media/wco/public/global/images/topics/facilitation/instruments-and-tools/aeo/aeo-logo.png",
    },
    {
      name: "FIATA Member",
      subtitle: "International Freight Forwarders",
      logo: "https://fiata.org/wp-content/uploads/2023/05/FIATA_Logo.png",
    },
    {
      name: "BAFFA Member",
      subtitle: "Bangladesh Freight Forwarders",
      logo: "https://baffa-bg.net/wp-content/uploads/2020/01/logo-1.png",
    },
    {
      name: "Licensed CHA",
      subtitle: "Customs House Agent",
      logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    },
    {
      name: "DCCI Member",
      subtitle: "Dhaka Chamber of Commerce",
      logo: "https://www.dhakachamber.com/images/logo.png",
    },
    {
      name: "IATA Agent",
      subtitle: "Air Transport Association",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/IATA_logo.svg/1200px-IATA_logo.svg.png",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Base marquee animation - continuous scroll
      const marquee1 = marqueeRef1.current;
      const marquee2 = marqueeRef2.current;

      // Get the width of one set of items
      const marquee1Width = marquee1.scrollWidth / 2;
      const marquee2Width = marquee2.scrollWidth / 2;

      // Create infinite loop animations
      const tl1 = gsap.to(marquee1, {
        x: -marquee1Width,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      const tl2 = gsap.to(marquee2, {
        x: marquee2Width,
        duration: 35,
        ease: "none",
        repeat: -1,
      });

      // Scroll-reactive speed modification
      let lastScrollY = window.scrollY;
      let scrollDirection = 1;
      let scrollVelocity = 0;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        
        // Determine scroll direction and velocity
        scrollDirection = delta > 0 ? 1 : -1;
        scrollVelocity = Math.min(Math.abs(delta) * 0.5, 10);

        // Adjust timeline speed based on scroll
        const speedMultiplier = 1 + scrollVelocity * 0.3;
        
        if (scrollDirection > 0) {
          // Scrolling down - row 1 goes left faster, row 2 goes right faster
          tl1.timeScale(speedMultiplier);
          tl2.timeScale(speedMultiplier);
        } else {
          // Scrolling up - reverse direction temporarily
          tl1.timeScale(-speedMultiplier);
          tl2.timeScale(-speedMultiplier);
        }

        lastScrollY = currentScrollY;

        // Reset to normal speed after scroll stops
        gsap.to(tl1, { timeScale: 1, duration: 0.5, delay: 0.1, ease: "power2.out" });
        gsap.to(tl2, { timeScale: 1, duration: 0.5, delay: 0.1, ease: "power2.out" });
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const CertCard = ({ cert, variant = "default" }) => (
    <div
      className={`shrink-0 mx-3 md:mx-4 px-6 py-4 md:px-8 md:py-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-4 ${
        variant === "alt" ? "bg-gray-50" : ""
      }`}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-lg flex items-center justify-center p-2 shrink-0">
        <img
          src={cert.logo}
          alt={cert.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://cdn-icons-png.flaticon.com/512/2991/2991148.png";
          }}
        />
      </div>
      <div className="whitespace-nowrap">
        <h4 className="font-semibold text-gray-900 text-sm md:text-base">
          {cert.name}
        </h4>
        <p className="text-gray-500 text-xs md:text-sm">{cert.subtitle}</p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-10 md:mb-14 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Trusted & Certified
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Certifications & Accreditations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Recognized by leading international bodies for excellence in logistics
          and supply chain management
        </p>
      </div>

      {/* Marquee Container */}
      <div className="space-y-6">
        {/* Row 1 - Left direction */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={marqueeRef1}
            className="flex"
            style={{ width: "fit-content" }}
          >
            {/* First set */}
            {certifications.map((cert, index) => (
              <CertCard key={`row1-a-${index}`} cert={cert} />
            ))}
            {/* Duplicate for seamless loop */}
            {certifications.map((cert, index) => (
              <CertCard key={`row1-b-${index}`} cert={cert} />
            ))}
          </div>
        </div>

        {/* Row 2 - Right direction (starts offset) */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={marqueeRef2}
            className="flex"
            style={{ width: "fit-content", transform: "translateX(-50%)" }}
          >
            {/* First set - reversed order */}
            {[...certifications].reverse().map((cert, index) => (
              <CertCard key={`row2-a-${index}`} cert={cert} variant="alt" />
            ))}
            {/* Duplicate for seamless loop */}
            {[...certifications].reverse().map((cert, index) => (
              <CertCard key={`row2-b-${index}`} cert={cert} variant="alt" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16 px-4">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-gray-900">8+</p>
          <p className="text-sm text-gray-600 mt-1">Certifications</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-gray-900">5+</p>
          <p className="text-sm text-gray-600 mt-1">Industry Memberships</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-600 mt-1">Compliance Rate</p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsMarquee;
