import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbAward,
  TbUsers,
  TbRocket,
  TbFileCheck,
  TbBook,
  TbMessages,
  TbReceipt,
  TbBuildingBank,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseCustoms = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const advantages = [
    {
      icon: TbAward,
      title: "Licensed Customs House Agent",
      description:
        "We're an officially licensed CHA, registered with customs authorities and authorized for all clearance operations.",
      color: "orange",
    },
    {
      icon: TbUsers,
      title: "Expert Team",
      description:
        "Our customs specialists have decades of combined experience handling complex clearance procedures.",
      color: "blue",
    },
    {
      icon: TbRocket,
      title: "Fast Processing",
      description:
        "Streamlined processes and strong customs relationships ensure quick turnaround times for your shipments.",
      color: "emerald",
    },
    {
      icon: TbFileCheck,
      title: "Accurate Documentation",
      description:
        "Meticulous document preparation minimizes errors and delays, ensuring smooth clearance every time.",
      color: "purple",
    },
    {
      icon: TbBook,
      title: "Regulatory Knowledge",
      description:
        "We stay current with all customs laws, FTAs, and regulatory changes affecting your imports and exports.",
      color: "rose",
    },
    {
      icon: TbMessages,
      title: "Dispute Resolution",
      description:
        "Expert handling of customs disputes, appeals, and negotiations to protect your business interests.",
      color: "amber",
    },
    {
      icon: TbReceipt,
      title: "Transparent Pricing",
      description:
        "Clear, competitive pricing with no hidden fees. Know exactly what you're paying for upfront.",
      color: "cyan",
    },
    {
      icon: TbBuildingBank,
      title: "Direct Customs Liaison",
      description:
        "Direct communication channels with customs officials ensure faster resolutions and smoother processes.",
      color: "indigo",
    },
  ];

  const colorClasses = {
    orange: { bg: "bg-orange-50", icon: "text-orange-500", border: "border-orange-200" },
    blue: { bg: "bg-blue-50", icon: "text-blue-500", border: "border-blue-200" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-500", border: "border-emerald-200" },
    purple: { bg: "bg-purple-50", icon: "text-purple-500", border: "border-purple-200" },
    rose: { bg: "bg-rose-50", icon: "text-rose-500", border: "border-rose-200" },
    amber: { bg: "bg-amber-50", icon: "text-amber-500", border: "border-amber-200" },
    cyan: { bg: "bg-cyan-50", icon: "text-cyan-500", border: "border-cyan-200" },
    indigo: { bg: "bg-indigo-50", icon: "text-indigo-500", border: "border-indigo-200" },
  };

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

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".card-icon");
        const content = card.querySelector(".card-content");

        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Icon entrance
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -15 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.08 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Content fade
        gsap.fromTo(
          content,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: index * 0.08 + 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, { scale: 1.15, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
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
            <TbAward className="w-4 h-4" />
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Trans Line for Customs?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Your trusted partner for seamless, compliant, and efficient 
            customs clearance services.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            const colors = colorClasses[advantage.color];
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm cursor-pointer transition-colors duration-300"
              >
                {/* Icon */}
                <div
                  className={`card-icon w-12 h-12 ${colors.bg} ${colors.border} border rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <div className="card-content">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl">
            <TbAward className="w-5 h-5 text-orange-500" />
            <span className="text-gray-700">
              <strong className="text-gray-900">15+ Years</strong> of trusted customs brokerage excellence
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCustoms;
