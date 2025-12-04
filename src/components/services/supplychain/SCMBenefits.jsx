import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPigMoney,
  TbRocket,
  TbEye,
  TbTrendingUp,
  TbShieldCheck,
  TbTarget,
  TbChartBar,
  TbCircleCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SCMBenefits = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef(null);

  const benefits = [
    {
      icon: TbPigMoney,
      title: "Cost Savings",
      description: "Reduced logistics costs through optimization",
      highlight: "15-30%",
      highlightLabel: "typical savings",
      color: "emerald",
    },
    {
      icon: TbRocket,
      title: "Faster Delivery",
      description: "Improved lead times and on-time performance",
      highlight: "40%",
      highlightLabel: "faster fulfillment",
      color: "blue",
    },
    {
      icon: TbEye,
      title: "Better Visibility",
      description: "Real-time tracking from factory to customer",
      highlight: "24/7",
      highlightLabel: "visibility",
      color: "purple",
    },
    {
      icon: TbTrendingUp,
      title: "Scalability",
      description: "Flexible solutions that grow with your business",
      highlight: "∞",
      highlightLabel: "scalable",
      color: "orange",
    },
    {
      icon: TbShieldCheck,
      title: "Risk Mitigation",
      description: "Contingency planning and alternative routes",
      highlight: "99%",
      highlightLabel: "reliability",
      color: "rose",
    },
    {
      icon: TbTarget,
      title: "Focus on Core Business",
      description: "Outsource logistics complexity to experts",
      highlight: "100%",
      highlightLabel: "focus",
      color: "cyan",
    },
    {
      icon: TbChartBar,
      title: "Data-Driven Decisions",
      description: "Analytics and KPI reporting for insights",
      highlight: "Real-time",
      highlightLabel: "analytics",
      color: "amber",
    },
  ];

  const colorClasses = {
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-500", highlight: "text-emerald-500", border: "border-emerald-200" },
    blue: { bg: "bg-blue-50", icon: "text-blue-500", highlight: "text-blue-500", border: "border-blue-200" },
    purple: { bg: "bg-purple-50", icon: "text-purple-500", highlight: "text-purple-500", border: "border-purple-200" },
    orange: { bg: "bg-orange-50", icon: "text-orange-500", highlight: "text-orange-500", border: "border-orange-200" },
    rose: { bg: "bg-rose-50", icon: "text-rose-500", highlight: "text-rose-500", border: "border-rose-200" },
    cyan: { bg: "bg-cyan-50", icon: "text-cyan-500", highlight: "text-cyan-500", border: "border-cyan-200" },
    amber: { bg: "bg-amber-50", icon: "text-amber-500", highlight: "text-amber-500", border: "border-amber-200" },
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

        const icon = card.querySelector(".benefit-icon");
        const check = card.querySelector(".benefit-check");
        const highlight = card.querySelector(".benefit-highlight");

        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: (index % 4) * 0.1,
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
          { scale: 0, rotation: -20 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            delay: (index % 4) * 0.1 + 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          check,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
            delay: (index % 4) * 0.1 + 0.3,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Counter animation for highlight
        if (highlight) {
          gsap.fromTo(
            highlight,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: (index % 4) * 0.1 + 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

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
            <TbCircleCheck className="w-4 h-4" />
            Why Choose Us
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits of Integrated Supply Chain Management
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Transform your logistics operations with our comprehensive 
            supply chain solutions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colors = colorClasses[benefit.color];

            // Make the last item span full width on larger screens if odd number
            const isLast = index === benefits.length - 1;
            const gridClass = isLast && benefits.length % 4 !== 0 
              ? "sm:col-span-2 lg:col-span-1" 
              : "";

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative bg-white border ${colors.border} rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group ${gridClass}`}
              >
                {/* Check Badge */}
                <div className="benefit-check absolute top-4 right-4 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <TbCircleCheck className="w-4 h-4 text-green-500" />
                </div>

                {/* Icon */}
                <div
                  className={`benefit-icon w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{benefit.description}</p>

                {/* Highlight */}
                <div className="benefit-highlight pt-4 border-t border-gray-100">
                  <div className={`text-2xl font-bold ${colors.highlight}`}>
                    {benefit.highlight}
                  </div>
                  <div className="text-xs text-gray-400">{benefit.highlightLabel}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <TbChartBar className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-500">Average ROI</div>
              <div className="text-lg font-bold text-gray-900">300% within first year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SCMBenefits;
