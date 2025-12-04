import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbTruckDelivery,
  TbPackage,
  TbChartBar,
  TbUsers,
  TbArrowRight,
  TbCircleCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SupplyChainIntro = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const diagramRef = useRef(null);
  const nodesRef = useRef([]);
  const connectorsRef = useRef([]);

  const supplyChainNodes = [
    { icon: TbUsers, label: "Planning", color: "blue" },
    { icon: TbPackage, label: "Procurement", color: "emerald" },
    { icon: TbChartBar, label: "Production", color: "purple" },
    { icon: TbTruckDelivery, label: "Logistics", color: "orange" },
  ];

  const keyPoints = [
    "Integrated approach to planning and execution",
    "End-to-end visibility across all touchpoints",
    "Cost optimization through intelligent routing",
    "Scalable solutions for growing businesses",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      const contentElements = contentRef.current?.querySelectorAll(".animate-item");
      gsap.fromTo(
        contentElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Diagram container
      gsap.fromTo(
        diagramRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: diagramRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Nodes animation
      nodesRef.current.forEach((node, index) => {
        if (!node) return;

        const icon = node.querySelector(".node-icon");
        const label = node.querySelector(".node-label");

        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.3 + index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          label,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: 0.5 + index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Continuous pulse animation
        gsap.to(icon, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });

      // Connectors animation
      connectorsRef.current.forEach((connector, index) => {
        if (!connector) return;

        gsap.fromTo(
          connector,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            delay: 0.6 + index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Arrow pulse
        const arrow = connector.querySelector(".connector-arrow");
        if (arrow) {
          gsap.to(arrow, {
            x: 3,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const colorClasses = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-500", ring: "ring-blue-100" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-500", ring: "ring-emerald-100" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-500", ring: "ring-purple-100" },
    orange: { bg: "bg-orange-50", border: "border-orange-200", icon: "text-orange-500", ring: "ring-orange-100" },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div ref={contentRef}>
            <span className="animate-item inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
              <TbChartBar className="w-4 h-4" />
              Understanding SCM
            </span>

            <h2 className="animate-item text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              What is Supply Chain Management?
            </h2>

            <p className="animate-item text-gray-600 text-lg leading-relaxed mb-6">
              Supply Chain Management (SCM) is an integrated approach to{" "}
              <span className="font-semibold text-gray-800">planning, procurement, production, and logistics</span>{" "}
              designed to ensure products reach customers efficiently and cost-effectively.
            </p>

            <p className="animate-item text-gray-500 leading-relaxed mb-8">
              At Trans Line, we orchestrate every element of your supply chain — from raw material 
              sourcing to final delivery — creating seamless connections that drive business growth 
              and customer satisfaction.
            </p>

            {/* Key Points */}
            <div className="animate-item space-y-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                    <TbCircleCheck className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-item mt-8">
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-300"
              >
                Explore Our Solutions
                <TbArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Diagram Side */}
          <div ref={diagramRef} className="relative">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
              {/* Center Title */}
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-800">
                  Integrated Supply Chain Flow
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Seamless connection across all stages
                </p>
              </div>

              {/* Flow Diagram */}
              <div className="flex items-center justify-between gap-2 md:gap-4">
                {supplyChainNodes.map((node, index) => {
                  const Icon = node.icon;
                  const colors = colorClasses[node.color];
                  const isLast = index === supplyChainNodes.length - 1;

                  return (
                    <React.Fragment key={index}>
                      {/* Node */}
                      <div
                        ref={(el) => (nodesRef.current[index] = el)}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`node-icon w-14 h-14 md:w-16 md:h-16 ${colors.bg} ${colors.border} border-2 rounded-2xl flex items-center justify-center ring-4 ${colors.ring} cursor-pointer transition-all duration-300 hover:scale-110`}
                        >
                          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.icon}`} />
                        </div>
                        <span className="node-label text-xs md:text-sm font-medium text-gray-700 mt-3 text-center">
                          {node.label}
                        </span>
                      </div>

                      {/* Connector */}
                      {!isLast && (
                        <div
                          ref={(el) => (connectorsRef.current[index] = el)}
                          className="flex-1 flex items-center origin-left"
                        >
                          <div className="w-full h-0.5 bg-gray-200 relative">
                            <div className="connector-arrow absolute right-0 top-1/2 -translate-y-1/2">
                              <TbArrowRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">15-30%</div>
                  <div className="text-xs text-gray-500 mt-1">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">99.5%</div>
                  <div className="text-xs text-gray-500 mt-1">On-Time Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs text-gray-500 mt-1">Visibility</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-50 rounded-full opacity-50 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainIntro;
