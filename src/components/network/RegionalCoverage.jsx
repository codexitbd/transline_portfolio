import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbMapPin,
  TbBuilding,
  TbBuildingFactory,
  TbShip,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const RegionalCoverage = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const regions = [
    {
      name: "Dhaka Region",
      icon: TbBuilding,
      color: "orange",
      locations: [
        "Dhaka City",
        "Tongi",
        "Gazipur",
        "Narayanganj",
        "Ashulia",
        "Savar",
      ],
    },
    {
      name: "Chittagong Region",
      icon: TbShip,
      color: "blue",
      locations: [
        "Chittagong Port Area",
        "CEPZ (Export Processing Zone)",
        "Karnaphuli",
        "Agrabad",
        "Patenga",
        "Halishahar",
      ],
    },
    {
      name: "Other Coverage",
      icon: TbBuildingFactory,
      color: "emerald",
      locations: [
        "Sylhet",
        "Khulna",
        "Mongla Port",
        "Rajshahi",
        "Comilla",
        "Mymensingh",
      ],
    },
  ];

  const colorClasses = {
    orange: { bg: "bg-orange-50", icon: "text-orange-500", border: "border-orange-200", dot: "bg-orange-500" },
    blue: { bg: "bg-blue-50", icon: "text-blue-500", border: "border-blue-200", dot: "bg-blue-500" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-500", border: "border-emerald-200", dot: "bg-emerald-500" },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".animate-heading"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".region-icon");
        const locations = card.querySelectorAll(".location-item");

        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          icon,
          { scale: 0, rotation: -20 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          locations,
          { x: -15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: index * 0.15 + 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbMapPin className="w-4 h-4" />
            Regional Coverage
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Coverage Across Bangladesh
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Our extensive network covers all major industrial and commercial 
            hubs throughout Bangladesh.
          </p>
        </div>

        {/* Region Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {regions.map((region, index) => {
            const Icon = region.icon;
            const colors = colorClasses[region.color];
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`bg-white border ${colors.border} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`region-icon w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                    <p className="text-sm text-gray-500">{region.locations.length} locations</p>
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-2">
                  {region.locations.map((location, lIndex) => (
                    <div
                      key={lIndex}
                      className="location-item flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div className={`w-2 h-2 ${colors.dot} rounded-full`} />
                      <span className="text-gray-700">{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Need service in a specific location? 
            <a href="#contact" className="text-orange-500 font-medium ml-1 hover:underline">
              Contact us for coverage details
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegionalCoverage;
