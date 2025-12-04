import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  TbWorld,
  TbMapPin,
  TbUsers,
  TbShip,
  TbPlane,
  TbArrowDown,
} from "react-icons/tb";

const NetworkHero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);
  const globeRef = useRef(null);
  const particlesRef = useRef([]);

  const stats = [
    { icon: TbWorld, value: "100+", label: "Countries" },
    { icon: TbUsers, value: "200+", label: "Partner Agents" },
    { icon: TbShip, value: "500+", label: "Ports Connected" },
    { icon: TbPlane, value: "50+", label: "Weekly Routes" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Content animations
      tl.fromTo(
        contentRef.current?.querySelectorAll(".animate-content"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
      );

      // Globe animation
      if (globeRef.current) {
        tl.fromTo(
          globeRef.current,
          { scale: 0.8, opacity: 0, rotation: -20 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" },
          "-=0.5"
        );

        // Continuous rotation
        gsap.to(globeRef.current, {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: "none",
        });
      }

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.8 + index * 0.1,
            ease: "back.out(1.5)",
          }
        );
      });

      // Particles animation
      particlesRef.current.forEach((particle, index) => {
        if (!particle) return;
        gsap.to(particle, {
          y: -20,
          x: (index % 2 === 0 ? 1 : -1) * 10,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });

      // Scroll indicator
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gray-50 overflow-hidden flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className={`absolute w-3 h-3 rounded-full opacity-40 ${
            i % 3 === 0 ? "bg-orange-400" : i % 3 === 1 ? "bg-blue-400" : "bg-emerald-400"
          }`}
          style={{
            top: `${15 + (i * 10)}%`,
            left: `${5 + (i * 12)}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <div className="animate-content inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-6">
              <TbWorld className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                Global Logistics Network
              </span>
            </div>

            <h1 className="animate-content text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Connecting Bangladesh to the{" "}
              <span className="text-orange-500">World</span>
            </h1>

            <p className="animate-content text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Through our extensive global network of trusted partners and 
              strategically located offices, we provide seamless logistics 
              solutions connecting you to over 100 countries worldwide.
            </p>

            <div className="animate-content flex flex-wrap gap-4">
              <a
                href="#offices"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-300"
              >
                <TbMapPin className="w-5 h-5" />
                View Our Offices
              </a>
              <a
                href="#partners"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-colors duration-300"
              >
                <TbUsers className="w-5 h-5" />
                Partner Network
              </a>
            </div>
          </div>

          {/* Right - Globe Visualization */}
          <div className="relative flex justify-center items-center">
            <div
              ref={globeRef}
              className="relative w-72 h-72 md:w-96 md:h-96"
            >
              {/* Globe Circle */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-200 bg-orange-50/50" />
              
              {/* Grid Lines */}
              <div className="absolute inset-4 rounded-full border border-dashed border-orange-300/50" />
              <div className="absolute inset-8 rounded-full border border-dashed border-orange-300/30" />
              <div className="absolute inset-12 rounded-full border border-dashed border-orange-300/20" />
              
              {/* Horizontal Lines */}
              <div className="absolute top-1/4 left-0 right-0 h-px bg-orange-200/50" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-orange-300/50" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-orange-200/50" />
              
              {/* Vertical Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-orange-300/50" />

              {/* Location Pins */}
              {[
                { top: "20%", left: "60%", color: "bg-blue-500" },
                { top: "35%", left: "30%", color: "bg-emerald-500" },
                { top: "45%", left: "70%", color: "bg-orange-500" },
                { top: "60%", left: "40%", color: "bg-purple-500" },
                { top: "70%", left: "65%", color: "bg-rose-500" },
                { top: "30%", left: "55%", color: "bg-cyan-500" },
              ].map((pin, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 ${pin.color} rounded-full shadow-lg`}
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className={`absolute inset-0 ${pin.color} rounded-full animate-ping opacity-50`} />
                </div>
              ))}

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <TbWorld className="w-10 h-10 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: "scale(1.2)" }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <TbArrowDown className="w-5 h-5 text-orange-500" />
        </div>
      </div>
    </section>
  );
};

export default NetworkHero;
