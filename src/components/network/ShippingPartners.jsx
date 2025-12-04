import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbShip, TbAnchor, TbWorld } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ShippingPartners = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const shippingLines = [
    {
      name: "Maersk Line",
      country: "Denmark",
      color: "#0077B5",
      routes: "200+ ports worldwide",
      specialty: "Global container shipping leader",
    },
    {
      name: "MSC",
      country: "Switzerland",
      color: "#002B5C",
      routes: "155 countries",
      specialty: "Mediterranean to worldwide shipping",
    },
    {
      name: "CMA CGM",
      country: "France",
      color: "#E40613",
      routes: "420+ ports",
      specialty: "French Line with innovative solutions",
    },
    {
      name: "COSCO Shipping",
      country: "China",
      color: "#1E3A8A",
      routes: "170+ ports",
      specialty: "China's largest shipping company",
    },
    {
      name: "Hapag-Lloyd",
      country: "Germany",
      color: "#FF6B00",
      routes: "130+ ports",
      specialty: "Premium quality shipping",
    },
    {
      name: "Evergreen Line",
      country: "Taiwan",
      color: "#00923F",
      routes: "240+ ports",
      specialty: "Asia-Pacific excellence",
    },
    {
      name: "ONE (Ocean Network Express)",
      country: "Japan",
      color: "#FF00FF",
      routes: "120+ services",
      specialty: "Unified Japanese shipping power",
    },
    {
      name: "Yang Ming",
      country: "Taiwan",
      color: "#FFD700",
      routes: "70+ services",
      specialty: "Trans-Pacific specialist",
    },
    {
      name: "HMM (Hyundai Merchant Marine)",
      country: "South Korea",
      color: "#002B5C",
      routes: "50+ services",
      specialty: "Korean shipping excellence",
    },
    {
      name: "ZIM",
      country: "Israel",
      color: "#FFA500",
      routes: "90+ ports",
      specialty: "Digital shipping innovation",
    },
  ];

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

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".shipping-card"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
            <TbShip className="w-4 h-4" />
            Shipping Partners
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Major Shipping Lines
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Partnered with the world's leading container shipping lines for 
            reliable and competitive ocean freight services.
          </p>
        </div>

        {/* Shipping Lines Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {shippingLines.map((line, index) => (
            <div
              key={index}
              className="shipping-card group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-300 h-full
                  ${hoveredIndex === index ? "bg-white shadow-lg border-gray-200 -translate-y-1" : ""}`}
              >
                {/* Company Icon with Color */}
                <div className="mb-4 relative">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: hoveredIndex === index ? line.color : "#f3f4f6",
                    }}
                  >
                    <TbAnchor
                      className={`w-8 h-8 transition-colors duration-300 ${
                        hoveredIndex === index ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                  {/* Country Badge */}
                  <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500 shadow-sm">
                    {line.country}
                  </div>
                </div>

                {/* Company Name */}
                <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                  {line.name}
                </h3>

                {/* Routes Info */}
                <div className="flex items-center gap-1 mb-2">
                  <TbWorld className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{line.routes}</span>
                </div>

                {/* Specialty (shown on hover) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    hoveredIndex === index ? "max-h-20 opacity-100 mt-3 pt-3 border-t border-gray-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs text-gray-600">{line.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "10+", label: "Shipping Lines" },
            { value: "500+", label: "Ports Covered" },
            { value: "Weekly", label: "Sailing Schedules" },
            { value: "24/7", label: "Booking Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-xl p-4 md:p-6 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingPartners;
