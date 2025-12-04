import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbWorld,
  TbDiscount,
  TbFileCheck,
  TbBuildingBank,
  TbDeviceAnalytics,
  TbHeadset,
  TbShieldCheck,
  TbCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseFreight = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      icon: TbWorld,
      title: "Global Network",
      description: "Partnerships in 100+ countries with reliable agents",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      icon: TbDiscount,
      title: "Competitive Rates",
      description: "Volume discounts negotiated with major carriers",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
    },
    {
      icon: TbFileCheck,
      title: "Expert Documentation",
      description: "Error-free shipping paperwork and compliance",
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
    },
    {
      icon: TbBuildingBank,
      title: "Customs Expertise",
      description: "Smooth clearance at origin and destination",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      icon: TbDeviceAnalytics,
      title: "Real-Time Tracking",
      description: "Complete shipment visibility throughout transit",
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
    },
    {
      icon: TbHeadset,
      title: "24/7 Support",
      description: "Dedicated customer service team always available",
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
    },
    {
      icon: TbShieldCheck,
      title: "Insurance Solutions",
      description: "Comprehensive cargo protection options",
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
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

        const icon = card.querySelector(".feature-icon");
        const checkmark = card.querySelector(".checkmark");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: "power3.out",
          }
        )
          .fromTo(
            checkmark,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            "-=0.3"
          )
          .fromTo(
            icon,
            { scale: 0, rotation: -90 },
            { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" },
            "-=0.2"
          );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -5, scale: 1.02, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.15, rotation: 8, duration: 0.3, ease: "power2.out" });
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbCheck className="w-4 h-4" />
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Freight Forwarding?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the difference with our comprehensive freight solutions 
            backed by expertise, technology, and a global network.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Checkmark Badge */}
                <div className="checkmark absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <TbCheck className="w-4 h-4 text-white" />
                </div>

                {/* Icon */}
                <div
                  className={`feature-icon w-14 h-14 ${feature.lightColor} rounded-xl flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-7 h-7 ${feature.color.replace("bg-", "text-")}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseFreight;
