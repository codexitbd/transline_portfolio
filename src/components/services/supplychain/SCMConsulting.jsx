import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBulb,
  TbSearch,
  TbRoute,
  TbDeviceDesktop,
  TbUsers,
  TbShieldCheck,
  TbArrowRight,
  TbCircleCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SCMConsulting = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const servicesRef = useRef([]);

  const benefits = [
    "Identify cost-reduction opportunities",
    "Improve delivery performance",
    "Reduce inventory carrying costs",
    "Enhance supply chain resilience",
    "Implement best practices",
  ];

  const consultingServices = [
    {
      icon: TbSearch,
      title: "Supply Chain Audit",
      description: "Comprehensive assessment of your current supply chain operations and performance.",
    },
    {
      icon: TbRoute,
      title: "Process Optimization",
      description: "Mapping and streamlining of logistics processes for maximum efficiency.",
    },
    {
      icon: TbDeviceDesktop,
      title: "Technology Selection",
      description: "Guidance on WMS, TMS, and other technology implementations.",
    },
    {
      icon: TbUsers,
      title: "Vendor Evaluation",
      description: "Assessment and selection of optimal suppliers and logistics partners.",
    },
    {
      icon: TbShieldCheck,
      title: "Risk Management",
      description: "Development of contingency plans and risk mitigation strategies.",
    },
  ];

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

      // Left content animation
      if (leftRef.current) {
        const items = leftRef.current.querySelectorAll(".animate-left");
        gsap.fromTo(
          items,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Services animation
      servicesRef.current.forEach((service, index) => {
        if (!service) return;

        const icon = service.querySelector(".service-icon");

        gsap.fromTo(
          service,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 80%",
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
            delay: index * 0.1 + 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        service.addEventListener("mouseenter", () => {
          gsap.to(service, { x: 5, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        service.addEventListener("mouseleave", () => {
          gsap.to(service, { x: 0, duration: 0.3, ease: "power2.out" });
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
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbBulb className="w-4 h-4" />
            Solution 8
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Supply Chain Consulting
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Expert guidance to optimize your supply chain operations and 
            drive continuous improvement.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - We Help You */}
          <div ref={leftRef}>
            <div className="animate-left bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <TbBulb className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">We Help You</h3>
                  <p className="text-gray-500 text-sm">Transform your supply chain</p>
                </div>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="animate-left flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                      <TbCircleCheck className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-left mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-300"
                >
                  Schedule Consultation
                  <TbArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Consulting Services */}
          <div ref={rightRef}>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Our Consulting Services
            </h3>

            <div className="space-y-4">
              {consultingServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => (servicesRef.current[index] = el)}
                    className="flex items-start gap-4 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-orange-200 rounded-2xl transition-all duration-300 cursor-pointer group hover:shadow-md"
                  >
                    <div className="service-icon shrink-0 w-12 h-12 bg-white group-hover:bg-orange-50 border border-gray-200 group-hover:border-orange-200 rounded-xl flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-1">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <TbArrowRight className="shrink-0 w-5 h-5 text-gray-300 group-hover:text-orange-500 self-center opacity-0 group-hover:opacity-100 transition-all duration-300" />
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

export default SCMConsulting;
