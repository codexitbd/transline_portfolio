import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  TbPlane,
  TbBuildingWarehouse,
  TbFileCheck,
  TbTruckDelivery,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ServiceOverview = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      icon: TbPlane,
      title: "International Freight Forwarding",
      description:
        "Seamless air, sea, and multimodal freight solutions connecting Bangladesh to 150+ countries. We handle everything from documentation to final delivery with competitive rates.",
      link: "/services/freight-forwarding",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: TbBuildingWarehouse,
      title: "Warehousing & CFS",
      description:
        "State-of-the-art warehousing facilities with Container Freight Station services. Secure storage, inventory management, and consolidation under one roof.",
      link: "/services/warehousing",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: TbFileCheck,
      title: "Customs Brokerage",
      description:
        "Expert customs clearance services with licensed professionals ensuring smooth, compliant, and timely clearance at all Bangladesh ports and airports.",
      link: "/services/customs-brokerage",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: TbTruckDelivery,
      title: "Supply Chain Management",
      description:
        "End-to-end supply chain solutions including procurement logistics, vendor management, and integrated distribution networks tailored to your business.",
      link: "/services/supply-chain",
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".service-icon");
        const content = card.querySelector(".service-content");
        const button = card.querySelector(".service-button");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: (index % 3) * 0.1,
            ease: "power3.out",
          }
        )
          .fromTo(
            icon,
            { scale: 0, rotate: -45 },
            { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.4"
          )
          .fromTo(
            content,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          )
          .fromTo(
            button,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          );

        // Hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotate: 5, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
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
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
            From freight forwarding to last-mile delivery, we provide integrated
            logistics solutions designed to streamline your supply chain and
            reduce costs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Accent */}
                <div
                  className={`absolute -right-16 -top-16 w-40 h-40 ${service.lightColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`service-icon w-16 h-16 ${service.lightColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-8 h-8 ${service.textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="service-content">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    to={service.link}
                    className={`service-button inline-flex items-center gap-2 text-sm font-semibold ${service.textColor} group-hover:gap-3 transition-all duration-300`}
                  >
                    Learn More
                    <TbArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Bottom Border Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
