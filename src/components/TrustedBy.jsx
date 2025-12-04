import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Placeholder logo components with company initials and industry colors
const clientLogos = [
  { id: 1, name: "Maersk Line", initials: "ML", color: "#0066A1", type: "Shipping Line" },
  { id: 2, name: "Emirates SkyCargo", initials: "ES", color: "#D71921", type: "Airline" },
  { id: 3, name: "Samsung Electronics", initials: "SE", color: "#1428A0", type: "International Brand" },
  { id: 4, name: "Unilever", initials: "UL", color: "#1F36C7", type: "International Brand" },
  { id: 5, name: "PRAN-RFL Group", initials: "PR", color: "#00A94F", type: "Local Manufacturer" },
  { id: 6, name: "Square Pharmaceuticals", initials: "SP", color: "#E31837", type: "Local Manufacturer" },
  { id: 7, name: "Hapag-Lloyd", initials: "HL", color: "#FF6200", type: "Shipping Line" },
  { id: 8, name: "Turkish Cargo", initials: "TC", color: "#E30A17", type: "Airline" },
  { id: 9, name: "Nestlé", initials: "NE", color: "#7B6C58", type: "International Brand" },
  { id: 10, name: "Beximco Group", initials: "BG", color: "#003366", type: "Local Manufacturer" },
  { id: 11, name: "MSC Mediterranean", initials: "MSC", color: "#0057B8", type: "Shipping Line" },
  { id: 12, name: "Qatar Airways Cargo", initials: "QA", color: "#5C0632", type: "Airline" },
  { id: 13, name: "H&M", initials: "HM", color: "#E50010", type: "International Brand" },
  { id: 14, name: "Walton", initials: "WL", color: "#1E40AF", type: "Local Manufacturer" },
  { id: 15, name: "CMA CGM", initials: "CMA", color: "#00205B", type: "Shipping Line" },
];

const LogoCard = ({ client, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: `0 20px 40px -10px ${client.color}30`,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [client.color]);

  return (
    <div
      ref={cardRef}
      className="logo-card group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-md border border-gray-100 cursor-pointer transition-colors duration-300 hover:border-gray-200"
    >
      {/* Logo placeholder */}
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:rotate-3"
        style={{ backgroundColor: client.color }}
      >
        {client.initials}
      </div>

      {/* Company name */}
      <div className="text-center">
        <p className="font-semibold text-gray-800 text-sm leading-tight">
          {client.name}
        </p>
        <p className="text-xs text-gray-400 mt-1">{client.type}</p>
      </div>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-1/2 transition-all duration-300 rounded-t-full"
        style={{ backgroundColor: client.color }}
      />
    </div>
  );
};

const TrustedBy = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const logos = gridRef.current.querySelectorAll(".logo-card");

    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(logos, { opacity: 0, y: 40, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        logos,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Trusted By Industry Leaders
          </h2>
          <p ref={subtitleRef} className="text-gray-600 text-lg max-w-2xl mx-auto">
            Partnering with global brands, manufacturers, and leading carriers to
            deliver excellence in logistics.
          </p>
        </div>

        {/* Logo Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {clientLogos.map((client, index) => (
            <LogoCard key={client.id} client={client} index={index} />
          ))}
        </div>

        {/* Bottom badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-linear-to-r from-gray-50 to-gray-100 rounded-full px-6 py-3 border border-gray-200">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: clientLogos[i].color }}
                >
                  {clientLogos[i].initials.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-gray-600 font-medium">
              <span className="text-gray-900 font-bold">200+</span> Trusted Partners
              Worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
