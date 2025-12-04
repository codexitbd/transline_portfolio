import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbClock,
  TbHome,
  TbPackage,
  TbRefresh,
  TbRoute,
  TbLock,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SpecializedClearance = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const specializedServices = [
    {
      icon: TbClock,
      title: "Temporary Import/Export",
      description: "ATA Carnet processing, trade fair goods, exhibition materials",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      icon: TbHome,
      title: "Personal Effects Clearance",
      description: "Household goods, used personal items, baggage clearance",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
    },
    {
      icon: TbPackage,
      title: "Sample Clearance",
      description: "Free samples, commercial samples, promotional materials",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      icon: TbRefresh,
      title: "Re-import/Re-export",
      description: "Repair goods, warranty replacements, returned merchandise",
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
    },
    {
      icon: TbRoute,
      title: "Transit Cargo",
      description: "Nepal, Bhutan transit through Bangladesh ports",
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
    },
    {
      icon: TbLock,
      title: "Bonded Cargo",
      description: "Warehousing under customs supervision, bonded manufacturing",
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
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
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".special-icon");

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
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          icon,
          { scale: 0, rotation: -90 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.15, rotation: 10, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-full mb-4">
            Special Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Specialized Clearance Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Expert handling of unique customs requirements for specialized 
            cargo types and situations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className={`special-icon w-14 h-14 ${service.lightColor} rounded-2xl flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-7 h-7 ${service.color.replace("bg-", "text-")}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecializedClearance;
