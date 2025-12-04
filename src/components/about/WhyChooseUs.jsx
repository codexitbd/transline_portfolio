import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbStack2,
  TbShieldCheck,
  TbWorld,
  TbCpu,
  TbUsers,
  TbChartBar,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const centerRef = useRef(null);

  const differentiators = [
    {
      icon: TbStack2,
      title: "Comprehensive Services",
      description:
        "Complete logistics portfolio under one roof - from freight forwarding to warehousing, customs clearance to last-mile delivery.",
      position: "top-left",
    },
    {
      icon: TbShieldCheck,
      title: "Regulatory Expertise",
      description:
        "Strong compliance framework and deep customs knowledge ensuring smooth clearance and zero delays at borders.",
      position: "top-right",
    },
    {
      icon: TbWorld,
      title: "Global-Local Balance",
      description:
        "International network spanning 50+ countries combined with unmatched local market expertise in Bangladesh.",
      position: "middle-left",
    },
    {
      icon: TbCpu,
      title: "Tech-Powered Operations",
      description:
        "Advanced digital platforms providing real-time visibility, automated alerts, and data-driven insights.",
      position: "middle-right",
    },
    {
      icon: TbUsers,
      title: "Expert Team",
      description:
        "500+ certified professionals with decades of combined experience in international trade and logistics.",
      position: "bottom-left",
    },
    {
      icon: TbChartBar,
      title: "Financial Stability",
      description:
        "19+ years of profitable operations and strong financial foundation ensuring long-term partnership reliability.",
      position: "bottom-right",
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

      // Center element animation
      gsap.fromTo(
        centerRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: centerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation - radiate from center
      cardsRef.current.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        const row = Math.floor(index / 2);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          {
            x: isLeft ? -80 : 80,
            y: 40,
            opacity: 0,
            scale: 0.8,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: row * 0.15,
            ease: "power3.out",
          }
        );

        // Icon animation
        const icon = card.querySelector(".diff-icon");
        tl.fromTo(
          icon,
          { scale: 0, rotate: isLeft ? -90 : 90 },
          { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.4"
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, {
            rotate: 10,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Floating animation for center element
      gsap.to(centerRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            Our Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Transline?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Six compelling reasons why businesses trust us with their logistics
            needs
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="relative">
          {/* Center Element - Desktop Only */}
          <div
            ref={centerRef}
            className="hidden lg:flex justify-center mb-10"
          >
            <div className="relative">
              <div className="w-28 h-28 bg-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <p className="text-3xl font-bold">6</p>
                  <p className="text-xs font-medium uppercase tracking-wide">
                    Key Factors
                  </p>
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-0 w-28 h-28 border-2 border-orange-200 rounded-full animate-ping opacity-30" />
              <div className="absolute -inset-3 border border-orange-100 rounded-full" />
              <div className="absolute -inset-6 border border-orange-50 rounded-full" />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="diff-icon w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-orange-50 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-orange-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Number indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Differentiator
                    </span>
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-gray-900">
                Ready to experience the Transline difference?
              </p>
              <p className="text-sm text-gray-600">
                Let's discuss your logistics requirements today.
              </p>
            </div>
            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-300 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
