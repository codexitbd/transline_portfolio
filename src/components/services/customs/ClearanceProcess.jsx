import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbFileUpload,
  TbCategory,
  TbFileText,
  TbSearch,
  TbClipboardCheck,
  TbCreditCard,
  TbCircleCheck,
  TbTruckDelivery,
  TbPlane,
  TbShip,
  TbClock,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ClearanceProcess = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);
  const timeRef = useRef(null);

  const processSteps = [
    {
      icon: TbFileUpload,
      title: "Document Submission",
      description: "Provide commercial invoice, packing list, BL/AWB",
      number: "01",
    },
    {
      icon: TbCategory,
      title: "HS Classification",
      description: "We classify goods and calculate applicable duties",
      number: "02",
    },
    {
      icon: TbFileText,
      title: "Filing",
      description: "Bill of Entry filed electronically with customs",
      number: "03",
    },
    {
      icon: TbSearch,
      title: "Examination",
      description: "Coordinate physical inspection if required",
      number: "04",
    },
    {
      icon: TbClipboardCheck,
      title: "Assessment",
      description: "Customs assesses duties and taxes",
      number: "05",
    },
    {
      icon: TbCreditCard,
      title: "Payment",
      description: "We facilitate duty payment processing",
      number: "06",
    },
    {
      icon: TbCircleCheck,
      title: "Release",
      description: "Cargo released from port/airport",
      number: "07",
    },
    {
      icon: TbTruckDelivery,
      title: "Delivery",
      description: "Transported to your warehouse",
      number: "08",
    },
  ];

  const clearanceTimes = [
    { icon: TbPlane, type: "Air Cargo", time: "1-3", unit: "working days" },
    { icon: TbShip, type: "Sea Cargo", time: "3-7", unit: "working days" },
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

      // Line animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
          }
        )
          .fromTo(
            icon,
            { scale: 0, rotation: -45 },
            { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" },
            "-=0.2"
          )
          .fromTo(
            number,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            "-=0.2"
          )
          .fromTo(
            content,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.1"
          );

        // Hover effects
        step.addEventListener("mouseenter", () => {
          gsap.to(step, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        step.addEventListener("mouseleave", () => {
          gsap.to(step, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Time cards animation
      if (timeRef.current) {
        const timeCards = timeRef.current.querySelectorAll(".time-card");
        gsap.fromTo(
          timeCards,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timeRef.current,
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbClock className="w-4 h-4" />
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customs Clearance Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A streamlined 8-step process designed for efficient and 
            compliant customs clearance.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mb-16">
          {/* Connection Line - Desktop */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-orange-200 origin-left"
            style={{ marginLeft: "6%", marginRight: "6%" }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className="relative text-center group cursor-pointer"
                >
                  {/* Icon */}
                  <div className="relative inline-flex justify-center mb-4">
                    <div className="step-icon w-16 h-16 md:w-20 md:h-20 bg-white border-2 border-orange-200 group-hover:border-orange-500 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 relative z-10">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-orange-500" />
                    </div>
                    {/* Number Badge */}
                    <div className="step-number absolute -top-2 -right-2 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-md z-20">
                      <span className="text-xs font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="step-content">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed hidden md:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Average Clearance Time */}
        <div ref={timeRef} className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {clearanceTimes.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="time-card bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-center gap-5"
              >
                <div className={`w-14 h-14 ${index === 0 ? 'bg-blue-50' : 'bg-emerald-50'} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${index === 0 ? 'text-blue-500' : 'text-emerald-500'}`} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{item.type}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{item.time}</span>
                    <span className="text-gray-500 text-sm">{item.unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          * Clearance time varies based on cargo type and inspection requirements
        </p>
      </div>
    </section>
  );
};

export default ClearanceProcess;
