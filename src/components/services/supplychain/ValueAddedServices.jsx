import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPackages,
  TbBarcode,
  TbEyeCheck,
  TbRotate,
  TbBox,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ValueAddedServices = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      icon: TbPackages,
      title: "Kitting & Assembly",
      description: "Bundling multiple SKUs into single sellable units. Create gift sets, promotional bundles, and custom kits.",
      features: ["Multi-SKU bundling", "Promotional kits", "Gift assembly"],
      color: "blue",
    },
    {
      icon: TbBarcode,
      title: "Labeling & Barcoding",
      description: "Country-specific labeling requirements and barcode application for retail and regulatory compliance.",
      features: ["Country-specific labels", "Barcode printing", "Compliance marking"],
      color: "emerald",
    },
    {
      icon: TbEyeCheck,
      title: "Quality Control",
      description: "Pre-shipment inspection and quality assurance to ensure products meet your standards.",
      features: ["Visual inspection", "Functional testing", "Documentation"],
      color: "purple",
    },
    {
      icon: TbRotate,
      title: "Returns Management",
      description: "Complete reverse logistics handling including inspection, restocking, and disposition.",
      features: ["Return processing", "Inspection & grading", "Refurbishment"],
      color: "rose",
    },
    {
      icon: TbBox,
      title: "Packaging Solutions",
      description: "Custom packaging and repackaging services tailored to product and destination requirements.",
      features: ["Custom packaging", "Repackaging", "Export packing"],
      color: "amber",
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-500", border: "border-blue-200", hover: "hover:border-blue-300" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-500", border: "border-emerald-200", hover: "hover:border-emerald-300" },
    purple: { bg: "bg-purple-50", icon: "text-purple-500", border: "border-purple-200", hover: "hover:border-purple-300" },
    rose: { bg: "bg-rose-50", icon: "text-rose-500", border: "border-rose-200", hover: "hover:border-rose-300" },
    amber: { bg: "bg-amber-50", icon: "text-amber-500", border: "border-amber-200", hover: "hover:border-amber-300" },
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

        const icon = card.querySelector(".card-icon");
        const features = card.querySelectorAll(".feature-tag");

        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
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
          { scale: 0, rotation: -15 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          features,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: index * 0.1 + 0.4,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.15, rotation: 5, duration: 0.3, ease: "power2.out" });
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbPackages className="w-4 h-4" />
            Solution 7
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Value-Added Services
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Enhance your supply chain with our comprehensive value-added 
            services tailored to your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = colorClasses[service.color];
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`bg-white border ${colors.border} ${colors.hover} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group`}
              >
                {/* Icon */}
                <div
                  className={`card-icon w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className={`feature-tag px-3 py-1 ${colors.bg} ${colors.icon} text-xs font-medium rounded-full`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 ${colors.icon} text-sm font-medium group-hover:gap-3 transition-all duration-300`}
                  >
                    Learn More
                    <TbArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need a custom service? 
            <a href="#contact" className="text-orange-500 font-medium ml-1 hover:underline">
              Contact us for tailored solutions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueAddedServices;
