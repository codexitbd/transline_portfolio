import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBuildingFactory,
  TbAlertCircle,
  TbBulb,
  TbChartBar,
  TbClock,
  TbCircleCheck,
  TbTrendingUp,
  TbQuote,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SCMCaseStudy = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const resultsRef = useRef([]);

  const caseStudy = {
    client: "Leading Garment Exporter",
    industry: "Garments & Apparel",
    challenge: "Multiple factories across different locations, complex export documentation requirements, and tight buyer deadlines causing delays and cost overruns.",
    solution: [
      "Centralized consolidation hub for all factory outputs",
      "Factory pickup schedules synchronized with production",
      "Single-window documentation for all exports",
      "Priority customs clearance arrangements",
    ],
    results: [
      { icon: TbClock, value: "40%", label: "Reduction in Lead Time", color: "blue" },
      { icon: TbCircleCheck, value: "99.5%", label: "On-Time Shipment Rate", color: "emerald" },
      { icon: TbTrendingUp, value: "25%", label: "Cost Savings", color: "orange" },
    ],
    testimonial: {
      quote: "Trans Line transformed our supply chain operations. What used to take weeks now happens in days, and our buyers have never been happier.",
      author: "Operations Director",
      company: "Leading Garment Exporter",
    },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll(".animate-content");
        gsap.fromTo(
          elements,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Card animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: 40, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const solutions = cardRef.current.querySelectorAll(".solution-item");
        gsap.fromTo(
          solutions,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Results animation
      resultsRef.current.forEach((result, index) => {
        if (!result) return;

        const icon = result.querySelector(".result-icon");
        const value = result.querySelector(".result-value");

        gsap.fromTo(
          result,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.5 + index * 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: result,
              start: "top 90%",
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
            duration: 0.4,
            delay: 0.6 + index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: result,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Pulse animation
        gsap.to(icon, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-500", value: "text-blue-500" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-500", value: "text-emerald-500" },
    orange: { bg: "bg-orange-50", icon: "text-orange-500", value: "text-orange-500" },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbChartBar className="w-4 h-4" />
            Success Story
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Case Study
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            See how we transformed supply chain operations for a leading 
            garment exporter.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Challenge & Testimonial */}
          <div ref={contentRef}>
            {/* Client Badge */}
            <div className="animate-content inline-flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
              <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
                <TbBuildingFactory className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{caseStudy.client}</div>
                <div className="text-sm text-gray-500">{caseStudy.industry}</div>
              </div>
            </div>

            {/* Challenge */}
            <div className="animate-content mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TbAlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-gray-900">The Challenge</h3>
              </div>
              <p className="text-gray-600 leading-relaxed pl-7">
                {caseStudy.challenge}
              </p>
            </div>

            {/* Testimonial */}
            <div className="animate-content bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <TbQuote className="w-10 h-10 text-orange-200 mb-4" />
              <p className="text-gray-700 text-lg leading-relaxed italic mb-4">
                "{caseStudy.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">OD</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {caseStudy.testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {caseStudy.testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Solution & Results */}
          <div>
            {/* Solution Card */}
            <div ref={cardRef} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <TbBulb className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Solution</h3>
              </div>

              <div className="space-y-3">
                {caseStudy.solution.map((item, index) => (
                  <div
                    key={index}
                    className="solution-item flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                      <TbCircleCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-4">
              {caseStudy.results.map((result, index) => {
                const Icon = result.icon;
                const colors = colorClasses[result.color];
                return (
                  <div
                    key={index}
                    ref={(el) => (resultsRef.current[index] = el)}
                    className={`${colors.bg} rounded-2xl p-5 text-center`}
                  >
                    <div className={`result-icon w-10 h-10 ${colors.bg} border-2 border-white rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <div className={`result-value text-2xl md:text-3xl font-bold ${colors.value} mb-1`}>
                      {result.value}
                    </div>
                    <div className="text-xs text-gray-600">{result.label}</div>
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

export default SCMCaseStudy;
