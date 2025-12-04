import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbTruckDelivery,
  TbPlane,
  TbFileCheck,
  TbBuildingWarehouse,
} from "react-icons/tb";
import Button from "./Button";
import { BsArrowRight } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: TbPlane,
    title: "International Freight Forwarding",
    description:
      "Air, ocean, and multimodal transport connecting 100+ countries worldwide",
    color: "#3B82F6",
  },
  {
    icon: TbBuildingWarehouse,
    title: "Warehousing & CFS Operations",
    description:
      "Secure storage with modern facilities and inventory management",
    color: "#8B5CF6",
  },
  {
    icon: TbFileCheck,
    title: "Customs Brokerage",
    description:
      "Expert clearance services ensuring fast, compliant documentation",
    color: "#F59E0B",
  },
  {
    icon: TbTruckDelivery,
    title: "Supply Chain Management",
    description:
      "End-to-end logistics solutions optimized for your business growth",
    color: "#10B981",
  },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const content = contentRef.current;
    const glow = glowRef.current;

    // Initial state
    gsap.set(card, { opacity: 0, y: 100, rotateX: -15 });
    gsap.set(icon, { scale: 0, rotation: -180 });
    gsap.set(content, { opacity: 0, y: 30 });

    // Scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(card, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power3.out",
    })
      .to(
        icon,
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Hover animations - smoother and less intense
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1.15,
        rotation: 8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(glow, {
        opacity: 0.8,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect - reduced radius and saturation */}
      <div
        ref={glowRef}
        className="absolute -inset-1 rounded-2xl opacity-0 blur-md transition-opacity"
        style={{ backgroundColor: service.color + "25" }}
      />

      {/* Card */}
      <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm overflow-hidden h-full">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${service.color} 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Animated border gradient */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.color}20, transparent 50%, ${service.color}20)`,
          }}
        />

        {/* Icon container */}
        <div
          ref={iconRef}
          className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6"
          style={{ backgroundColor: service.color + "20" }}
        >
          <Icon
            className="w-8 h-8"
            style={{ color: service.color }}
          />
          
          {/* Icon glow */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500"
            style={{ backgroundColor: service.color }}
          />
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <h3 className="text-xl font-bold text-gray-900 mb-3  group-hover:bg-linear-to-r transition-all duration-300"
            style={{
              "--tw-gradient-from": service.color,
              "--tw-gradient-to": "#1f2937",
            }}
          >
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-4"
            style={{ color: service.color }}
          >
            <span>Learn More</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </div>
  );
};

const CoreServices = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const lineRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const line = lineRef.current;
    const grid = gridRef.current;

    // Initial states
    gsap.set(heading, { opacity: 0, x: 200 });
    gsap.set(subheading, { opacity: 0, x: 150 });
    gsap.set(line, { scaleX: 0, transformOrigin: "right" });

    // Animate heading on scroll - coming from right
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(heading, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        line,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(
        subheading,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

    // Grid animation on scroll
    gsap.to(grid, {
      backgroundPosition: "100% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        {/* Animated Grid pattern */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "0% 0%",
          }}
        />
        
        {/* Animated highlight cells */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[120px] h-[120px] bg-blue-400/10 rounded-sm animate-pulse"
            style={{ top: "20%", left: "10%", animationDelay: "0s", animationDuration: "3s" }}
          />
          <div 
            className="absolute w-[60px] h-[60px] bg-purple-400/10 rounded-sm animate-pulse"
            style={{ top: "60%", left: "25%", animationDelay: "1s", animationDuration: "4s" }}
          />
          <div 
            className="absolute w-[120px] h-[120px] bg-cyan-400/10 rounded-sm animate-pulse"
            style={{ top: "30%", right: "15%", animationDelay: "0.5s", animationDuration: "3.5s" }}
          />
          <div 
            className="absolute w-[60px] h-[60px] bg-blue-400/10 rounded-sm animate-pulse"
            style={{ bottom: "20%", right: "30%", animationDelay: "2s", animationDuration: "4s" }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 overflow-hidden">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            Our Core Services
          </h2>
          
          {/* Animated line */}
          <div
            ref={lineRef}
            className="w-24 h-1 mx-auto mb-6 rounded-full bg-blue-600"
            style={{ transformOrigin: "center" }}
          />
          
          <p
            ref={subheadingRef}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Comprehensive logistics solutions tailored to power your global
            business operations with precision and reliability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            Looking for a custom logistics solution?
          </p>
          {/* <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:bg-blue-700">
            <span className="relative z-10">Get a Custom Quote</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            
            Button glow effect
            <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
          </button> */}
          <Button title="Get a Custom Quote" containerClass="!bg-orange-500 text-white" />
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
