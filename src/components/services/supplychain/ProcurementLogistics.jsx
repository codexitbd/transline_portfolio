import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPackageImport,
  TbUsers,
  TbBuildingWarehouse,
  TbFileCheck,
  TbPlane,
  TbWorld,
  TbCreditCard,
  TbClipboardList,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ProcurementLogistics = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const decorRef = useRef(null);

  const sections = [
    {
      title: "Supplier Coordination",
      icon: TbUsers,
      color: "blue",
      description: "Seamless vendor management and factory coordination for efficient inbound logistics.",
      features: [
        { icon: TbBuildingWarehouse, text: "Vendor consolidation services" },
        { icon: TbPackageImport, text: "Factory pickups & consolidation" },
        { icon: TbFileCheck, text: "Quality inspection at origin" },
        { icon: TbClipboardList, text: "Export documentation support" },
      ],
    },
    {
      title: "International Sourcing",
      icon: TbWorld,
      color: "emerald",
      description: "Complete support for overseas procurement with end-to-end visibility.",
      features: [
        { icon: TbPlane, text: "Freight from overseas suppliers" },
        { icon: TbFileCheck, text: "Import clearance management" },
        { icon: TbCreditCard, text: "Delivered Duty Paid (DDP) solutions" },
        { icon: TbClipboardList, text: "Purchase order tracking" },
      ],
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-500",
      hover: "group-hover:border-blue-300",
    },
    emerald: {
      bg: "bg-emerald-500",
      light: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-500",
      hover: "group-hover:border-emerald-300",
    },
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
        const features = card.querySelectorAll(".feature-item");

        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: index * 0.2,
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
            delay: index * 0.2 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          features,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: index * 0.2 + 0.4,
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
          gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Decorative animation
      if (decorRef.current) {
        gsap.to(decorRef.current.querySelectorAll(".decor-circle"), {
          y: -15,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbPackageImport className="w-4 h-4" />
            Solution 2
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Procurement Logistics (Inbound)
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Streamlined inbound logistics from supplier to your facility with 
            complete visibility and control.
          </p>
        </div>

        {/* Cards */}
        <div className="relative">
          {/* Decorative Elements */}
          <div ref={decorRef} className="absolute inset-0 pointer-events-none -z-10">
            <div className="decor-circle absolute top-10 left-10 w-20 h-20 bg-blue-50 rounded-full opacity-60" />
            <div className="decor-circle absolute bottom-10 right-10 w-28 h-28 bg-emerald-50 rounded-full opacity-60" />
            <div className="decor-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-50 rounded-full opacity-30" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const colors = colorClasses[section.color];
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`group bg-white border ${colors.border} ${colors.hover} rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`card-icon shrink-0 w-14 h-14 ${colors.light} rounded-2xl flex items-center justify-center`}
                    >
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {section.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {section.features.map((feature, fIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={fIndex}
                          className="feature-item flex items-center gap-3 p-3 bg-gray-50 group-hover:bg-gray-100/80 rounded-xl transition-colors duration-300"
                        >
                          <div className="shrink-0 w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                            <FeatureIcon className={`w-4 h-4 ${colors.text}`} />
                          </div>
                          <span className="text-gray-700 text-sm font-medium">
                            {feature.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <a
                      href="#contact"
                      className={`inline-flex items-center gap-2 ${colors.text} font-medium text-sm hover:gap-3 transition-all duration-300`}
                    >
                      Learn More
                      <TbArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50+", label: "Supplier Networks" },
            { value: "15", label: "Origin Countries" },
            { value: "98%", label: "On-Time Pickup" },
            { value: "24h", label: "PO Tracking Updates" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-gray-50 rounded-xl"
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcurementLogistics;
