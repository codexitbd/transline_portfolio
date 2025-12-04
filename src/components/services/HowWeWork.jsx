import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbMessageQuestion,
  TbCalculator,
  TbCalendarCheck,
  TbPackageExport,
  TbMapPin2,
  TbTruckDelivery,
  TbHeadset,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stepsRef = useRef([]);

  const steps = [
    {
      number: "01",
      icon: TbMessageQuestion,
      title: "Inquiry",
      description: "You contact us with your logistics requirements and cargo details",
      color: "bg-blue-500",
    },
    {
      number: "02",
      icon: TbCalculator,
      title: "Quote",
      description: "We analyze your needs and provide competitive, transparent pricing",
      color: "bg-purple-500",
    },
    {
      number: "03",
      icon: TbCalendarCheck,
      title: "Booking",
      description: "Secure your shipment slot and confirm all logistics arrangements",
      color: "bg-amber-500",
    },
    {
      number: "04",
      icon: TbPackageExport,
      title: "Execution",
      description: "We handle pickup, documentation, customs, and transportation",
      color: "bg-emerald-500",
    },
    {
      number: "05",
      icon: TbMapPin2,
      title: "Tracking",
      description: "Real-time visibility and updates throughout the journey",
      color: "bg-rose-500",
    },
    {
      number: "06",
      icon: TbTruckDelivery,
      title: "Delivery",
      description: "On-time delivery to your destination with proof of delivery",
      color: "bg-teal-500",
    },
    {
      number: "07",
      icon: TbHeadset,
      title: "Support",
      description: "Post-delivery assistance and continuous customer care",
      color: "bg-orange-500",
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

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const icon = step.querySelector(".step-icon");
        const number = step.querySelector(".step-number");
        const content = step.querySelector(".step-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          step,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
          }
        )
          .fromTo(
            icon,
            { scale: 0, rotate: -180 },
            { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
          )
          .fromTo(
            number,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            "-=0.3"
          )
          .fromTo(
            content,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          );

        // Hover effect
        step.addEventListener("mouseenter", () => {
          gsap.to(step, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.15, rotate: 10, duration: 0.3, ease: "power2.out" });
        });

        step.addEventListener("mouseleave", () => {
          gsap.to(step, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-sm mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How We Work
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            A streamlined 7-step process designed for maximum efficiency and
            complete transparency
          </p>
        </div>

        {/* Process Flow - Desktop */}
        <div className="hidden lg:block relative">
          {/* Steps */}
          <div className="grid grid-cols-7 gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <div
                  key={index}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className="relative text-center group cursor-pointer"
                >
                  {/* Connection Line & Arrow (except last) */}
                  {!isLast && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 z-0">
                      {/* Line */}
                      <div
                        className="absolute left-8 right-0 h-full bg-orange-200"
                      />
                      {/* Arrow */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-200">
                          <svg
                            className="w-3 h-3 text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div className="relative inline-flex justify-center mb-6 z-10">
                    <div
                      className={`step-icon w-16 h-16 ${step.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 ring-4 ring-gray-50`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Number Badge */}
                    <div className="step-number absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-xs font-bold text-gray-700">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="step-content">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Flow - Tablet */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className="relative text-center group cursor-pointer"
                >
                  {/* Icon Circle */}
                  <div className="relative inline-flex justify-center mb-4">
                    <div
                      className={`step-icon w-14 h-14 ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="step-number absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-[10px] font-bold text-gray-700">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="step-content">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Flow - Mobile */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-200" />

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      if (!stepsRef.current.includes(el) && el) {
                        stepsRef.current[index] = el;
                      }
                    }}
                    className="relative flex items-start gap-5 group"
                  >
                    {/* Icon */}
                    <div className="relative shrink-0">
                      <div
                        className={`step-icon w-16 h-16 ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="step-number absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-gray-700">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="step-content flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
