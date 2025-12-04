import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbAward,
  TbPackages,
  TbWorld,
  TbClockCheck,
  TbUsers,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  {
    icon: TbAward,
    value: 25,
    suffix: "+",
    label: "Years of Excellence",
    color: "#3B82F6",
  },
  {
    icon: TbPackages,
    value: 10000,
    suffix: "+",
    label: "Shipments Annually",
    color: "#10B981",
  },
  {
    icon: TbWorld,
    value: 50,
    suffix: "+",
    label: "Countries Connected",
    color: "#8B5CF6",
  },
  {
    icon: TbClockCheck,
    value: 98,
    suffix: "%",
    label: "On-Time Delivery",
    color: "#F59E0B",
  },
  {
    icon: TbUsers,
    value: 500,
    suffix: "+",
    label: "Satisfied Clients",
    color: "#EF4444",
  },
];

const FactCard = ({ fact, index }) => {
  const cardRef = useRef(null);
  const numberRef = useRef(null);
  const iconRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const line = lineRef.current;

    // Initial state
    gsap.set(card, { opacity: 0, y: 60 });
    gsap.set(icon, { scale: 0, rotation: -90 });
    gsap.set(line, { scaleX: 0 });

    // Scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power3.out",
    })
      .to(
        icon,
        {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .to(
        line,
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );

    // Counter animation
    const counterTl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    counterTl.fromTo(
      numberRef.current,
      { innerText: 0 },
      {
        innerText: fact.value,
        duration: 2,
        delay: index * 0.1 + 0.3,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          const val = Math.floor(this.targets()[0].innerText);
          numberRef.current.innerText = val.toLocaleString();
        },
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -12,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(line, {
        scaleX: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
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
      gsap.to(line, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index, fact.value]);

  const Icon = fact.icon;

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center text-center cursor-pointer group px-6 py-8"
    >
      {/* Icon */}
      <div
        ref={iconRef}
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-shadow duration-300 group-hover:shadow-lg"
        style={{ 
          backgroundColor: fact.color + "15",
          boxShadow: `0 0 0 0 ${fact.color}20`
        }}
      >
        <Icon className="w-8 h-8" style={{ color: fact.color }} />
        
        {/* Pulse ring on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 20px ${fact.color}30`,
          }}
        />
      </div>

      {/* Number */}
      <div className="flex items-baseline justify-center mb-2">
        <span
          ref={numberRef}
          className="text-4xl md:text-5xl font-bold text-gray-900 tabular-nums"
        >
          0
        </span>
        <span
          className="text-3xl md:text-4xl font-bold ml-1"
          style={{ color: fact.color }}
        >
          {fact.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-gray-600 text-sm font-medium">{fact.label}</p>

      {/* Bottom accent line */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full"
        style={{ 
          backgroundColor: fact.color,
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

const KeyFacts = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const bgLineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const bgLine = bgLineRef.current;

    // Initial states
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(container, { opacity: 0 });
    gsap.set(bgLine, { scaleX: 0 });

    // Animate on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        bgLine,
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
      .to(
        container,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Parallax effect on scroll
    gsap.to(bgLine, {
      backgroundPosition: "200% 0%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Trusted by Industry Leaders
          </h2>
          
          {/* Animated background line */}
          <div
            ref={bgLineRef}
            className="w-32 h-1.5 mx-auto rounded-full"
            style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981, #F59E0B, #EF4444, #3B82F6)",
              backgroundSize: "200% 100%",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Facts Grid */}
        <div
          ref={containerRef}
          className="relative bg-gray-50/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm"
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-3/4 h-full bg-linear-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Facts container */}
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0 divide-gray-200/50">
            {facts.map((fact, index) => (
              <FactCard key={index} fact={fact} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Delivering excellence across the globe, one shipment at a time.
        </p>
      </div>
    </section>
  );
};

export default KeyFacts;
