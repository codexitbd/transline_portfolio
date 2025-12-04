import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  TbShirt,
  TbPill,
  TbDeviceMobile,
  TbShoppingCart,
  TbCar,
  TbPackage,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const IndustriesServed = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const industriesRef = useRef([]);
  const ctaRef = useRef(null);

  const industries = [
    {
      icon: TbShirt,
      name: "RMG & Textiles",
      description: "Garment exports and textile imports",
    },
    {
      icon: TbPill,
      name: "Pharmaceuticals",
      description: "Temperature-controlled pharma logistics",
    },
    {
      icon: TbDeviceMobile,
      name: "Electronics",
      description: "High-value electronics handling",
    },
    {
      icon: TbShoppingCart,
      name: "FMCG",
      description: "Fast-moving consumer goods",
    },
    {
      icon: TbCar,
      name: "Automotive",
      description: "Auto parts and vehicle logistics",
    },
    {
      icon: TbPackage,
      name: "E-commerce",
      description: "B2C fulfillment solutions",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Industries animation
      industriesRef.current.forEach((industry, index) => {
        if (!industry) return;

        gsap.fromTo(
          industry,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: industry,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effect
        industry.addEventListener("mouseenter", () => {
          gsap.to(industry, { scale: 1.05, y: -5, duration: 0.3, ease: "power2.out" });
        });

        industry.addEventListener("mouseleave", () => {
          gsap.to(industry, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            Industry Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Specialized logistics solutions tailored to the unique requirements
            of diverse industries
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-10">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                ref={(el) => (industriesRef.current[index] = el)}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-5 md:p-6 text-center border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 bg-white group-hover:bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {industry.name}
                </h3>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 group"
          >
            Explore All Industries
            <TbArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;
