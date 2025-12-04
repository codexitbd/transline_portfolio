import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbNetwork,
  TbUsers,
  TbCoin,
  TbMapPin,
  TbPhone,
  TbArrowRight,
  TbCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const NetworkBenefits = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  const benefits = [
    {
      icon: TbNetwork,
      title: "Seamless Connections",
      description:
        "Our integrated network ensures smooth handoffs between partners, providing end-to-end visibility and consistent service quality across all touchpoints.",
      color: "orange",
      features: [
        "Real-time tracking",
        "Unified communication",
        "Standardized processes",
      ],
    },
    {
      icon: TbUsers,
      title: "Reliable Partners",
      description:
        "Every partner in our network is carefully vetted and must meet our strict quality and compliance standards to ensure reliable service delivery.",
      color: "blue",
      features: [
        "Vetted partnerships",
        "Quality assurance",
        "Compliance certified",
      ],
    },
    {
      icon: TbCoin,
      title: "Competitive Rates",
      description:
        "Our volume-based negotiations with shipping lines and airlines allow us to offer highly competitive rates without compromising on service quality.",
      color: "emerald",
      features: [
        "Volume discounts",
        "Best rate guarantee",
        "Transparent pricing",
      ],
    },
    {
      icon: TbMapPin,
      title: "Local Expertise",
      description:
        "Our local partners bring invaluable knowledge of regional regulations, customs procedures, and market conditions to every shipment.",
      color: "purple",
      features: [
        "Regional specialists",
        "Customs knowledge",
        "Market insights",
      ],
    },
    {
      icon: TbPhone,
      title: "Single Point of Contact",
      description:
        "Despite our vast network, you deal with one dedicated contact who coordinates all aspects of your shipment from origin to destination.",
      color: "rose",
      features: [
        "Dedicated support",
        "24/7 availability",
        "Personalized service",
      ],
    },
  ];

  const colorClasses = {
    orange: {
      bg: "bg-orange-500",
      light: "bg-orange-50",
      text: "text-orange-500",
      border: "border-orange-200",
    },
    blue: {
      bg: "bg-blue-500",
      light: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-200",
    },
    emerald: {
      bg: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-500",
      border: "border-emerald-200",
    },
    purple: {
      bg: "bg-purple-500",
      light: "bg-purple-50",
      text: "text-purple-500",
      border: "border-purple-200",
    },
    rose: {
      bg: "bg-rose-500",
      light: "bg-rose-50",
      text: "text-rose-500",
      border: "border-rose-200",
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
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".benefit-card"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbNetwork className="w-4 h-4" />
            Why Our Network
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Network Advantages
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Our extensive global network delivers tangible benefits that make 
            your logistics operations smoother and more efficient.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => {
            const colors = colorClasses[benefit.color];
            return (
              <div
                key={index}
                className={`benefit-card group bg-gray-50 hover:bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:${colors.border} transition-all duration-300 hover:shadow-lg`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className={`w-7 h-7 ${colors.text}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {benefit.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div
                        className={`w-5 h-5 ${colors.light} rounded-full flex items-center justify-center shrink-0`}
                      >
                        <TbCheck className={`w-3 h-3 ${colors.text}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="mt-16 bg-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-48 h-48 border border-white rounded-full"
                  style={{
                    left: `${(i % 5) * 25}%`,
                    top: `${Math.floor(i / 5) * 30}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Leverage Our Network?
              </h3>
              <p className="text-gray-400 max-w-xl">
                Connect with our team to discuss how our global network can 
                optimize your supply chain and reduce logistics costs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:gap-3"
              >
                Contact Us
                <TbArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#partners"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
              >
                View Partners
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkBenefits;
