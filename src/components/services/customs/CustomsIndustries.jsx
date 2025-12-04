import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbHanger,
  TbDeviceMobile,
  TbPill,
  TbFlask,
  TbTractor,
  TbCar,
  TbPackage,
  TbBuildingFactory,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CustomsIndustries = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const industries = [
    {
      icon: TbHanger,
      title: "Garments & Textiles",
      description:
        "RMG exports, fabric imports, trims & accessories clearance with quota management.",
      stats: "500+ exporters served",
      color: "rose",
    },
    {
      icon: TbDeviceMobile,
      title: "Electronics & IT",
      description:
        "Mobile phones, computers, electronic components with BIS certification support.",
      stats: "Fast-track clearance",
      color: "blue",
    },
    {
      icon: TbPill,
      title: "Pharmaceuticals",
      description:
        "API imports, finished medicine exports with drug controller approvals.",
      stats: "DGDA compliant",
      color: "emerald",
    },
    {
      icon: TbFlask,
      title: "Chemicals",
      description:
        "Industrial chemicals, hazmat clearance with proper safety documentation.",
      stats: "ADR certified",
      color: "purple",
    },
    {
      icon: TbTractor,
      title: "Agriculture",
      description:
        "Food products, raw materials, perishables with phytosanitary certificates.",
      stats: "Cold chain ready",
      color: "green",
    },
    {
      icon: TbCar,
      title: "Automotive",
      description:
        "Vehicles, spare parts, machinery with homologation and BSTI support.",
      stats: "End-to-end support",
      color: "orange",
    },
    {
      icon: TbPackage,
      title: "Consumer Goods",
      description:
        "FMCG products, cosmetics, household items with labeling compliance.",
      stats: "Retail-ready",
      color: "amber",
    },
    {
      icon: TbBuildingFactory,
      title: "Industrial Equipment",
      description:
        "Heavy machinery, capital goods with project import schemes and exemptions.",
      stats: "Tax optimization",
      color: "slate",
    },
  ];

  const colorClasses = {
    rose: { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-500" },
    blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-500" },
    emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-500" },
    purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-500" },
    green: { bg: "bg-green-500", light: "bg-green-50", text: "text-green-500" },
    orange: { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-500" },
    amber: { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-500" },
    slate: { bg: "bg-slate-500", light: "bg-slate-50", text: "text-slate-500" },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".industry-icon");
        const content = card.querySelector(".industry-content");
        const arrow = card.querySelector(".industry-arrow");
        const overlay = card.querySelector(".industry-overlay");

        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: (index % 4) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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
            delay: (index % 4) * 0.1 + 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
          gsap.to(overlay, { opacity: 0.05, duration: 0.3 });
          gsap.to(arrow, { x: 5, opacity: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(overlay, { opacity: 0, duration: 0.3 });
          gsap.to(arrow, { x: 0, opacity: 0.5, duration: 0.3, ease: "power2.out" });
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbBuildingFactory className="w-4 h-4" />
            Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Specialized customs clearance expertise across diverse industry sectors 
            with product-specific knowledge.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const colors = colorClasses[industry.color];
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative group bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm cursor-pointer overflow-hidden"
              >
                {/* Hover Overlay */}
                <div
                  className={`industry-overlay absolute inset-0 ${colors.bg} opacity-0 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`industry-icon w-12 h-12 ${colors.light} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>

                  {/* Text Content */}
                  <div className="industry-content">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {industry.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">
                      {industry.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${colors.text}`}>
                        {industry.stats}
                      </span>
                      <TbArrowRight className="industry-arrow w-4 h-4 text-gray-400 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need clearance for a different industry? 
            <a href="#" className="text-orange-500 font-medium ml-1 hover:underline">
              Contact our experts
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomsIndustries;
