import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbUserCheck,
  TbTruck,
  TbChartBar,
  TbRefresh,
  TbArrowRight,
  TbCircleCheck,
  TbStars,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const LLPServices = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const featuresRef = useRef([]);

  const llpFeatures = [
    {
      icon: TbTruck,
      title: "Complete Logistics Outsourcing",
      description: "End-to-end logistics management so you can focus on your core business.",
    },
    {
      icon: TbUserCheck,
      title: "Carrier Management & Negotiation",
      description: "Optimal carrier selection and rate negotiations for cost efficiency.",
    },
    {
      icon: TbChartBar,
      title: "Performance Monitoring & Reporting",
      description: "Regular KPI tracking and comprehensive performance reports.",
    },
    {
      icon: TbRefresh,
      title: "Continuous Improvement Initiatives",
      description: "Ongoing process optimization and efficiency enhancements.",
    },
  ];

  const benefits = [
    "Single point of contact for all logistics needs",
    "Reduced complexity and administrative burden",
    "Cost savings through economies of scale",
    "Access to expert logistics knowledge",
    "Improved supply chain visibility",
    "Scalable solutions for business growth",
  ];

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
            duration: 0.7,
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
      }

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;

        const icon = feature.querySelector(".feature-icon");

        gsap.fromTo(
          feature,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          icon,
          { scale: 0, rotation: -15 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            delay: 0.4 + index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        feature.addEventListener("mouseenter", () => {
          gsap.to(feature, { x: 8, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.15, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        feature.addEventListener("mouseleave", () => {
          gsap.to(feature, { x: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="animate-content inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
              <TbStars className="w-4 h-4" />
              Solution 5
            </span>

            <h2 className="animate-content text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Lead Logistics Provider (LLP) Services
            </h2>

            <p className="animate-content text-gray-600 text-lg leading-relaxed mb-6">
              We act as your <span className="font-semibold text-gray-800">single-point logistics partner</span>, 
              taking complete ownership of your supply chain operations. Let us handle the complexity 
              while you focus on growing your business.
            </p>

            {/* Benefits List */}
            <div className="animate-content space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                    <TbCircleCheck className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-content">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-300"
              >
                Partner With Us
                <TbArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Card */}
          <div ref={cardRef} className="relative">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <TbUserCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your LLP Partner</h3>
                  <p className="text-gray-500 text-sm">Comprehensive logistics management</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {llpFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      ref={(el) => (featuresRef.current[index] = el)}
                      className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors duration-300 cursor-pointer group"
                    >
                      <div className="feature-icon shrink-0 w-11 h-11 bg-white group-hover:bg-orange-100 rounded-xl flex items-center justify-center border border-gray-100 group-hover:border-orange-200 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Stats */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-500">100+</div>
                  <div className="text-xs text-gray-500">Active Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">15+</div>
                  <div className="text-xs text-gray-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">99%</div>
                  <div className="text-xs text-gray-500">Client Retention</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100 rounded-full opacity-50 -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LLPServices;
