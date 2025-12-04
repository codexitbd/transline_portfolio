import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbShieldCheck,
  TbAward,
  TbBulb,
  TbHeartHandshake,
  TbClock,
  TbLeaf,
  TbTarget,
  TbEye,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const MissionVisionValues = () => {
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const valuesHeaderRef = useRef(null);
  const valuesRef = useRef([]);
  const decorRef = useRef(null);

  const data = {
    mission: {
      icon: TbTarget,
      title: "Our Mission",
      statement:
        "To deliver reliable, efficient, and innovative supply chain solutions that empower businesses to compete and grow in the global marketplace.",
    },
    vision: {
      icon: TbEye,
      title: "Our Vision",
      statement:
        "To be Bangladesh's most trusted and technologically advanced logistics partner, connecting local businesses to international opportunities.",
    },
    values: [
      {
        icon: TbShieldCheck,
        title: "Integrity",
        description: "Transparent operations and honest communication",
        color: "bg-blue-500",
        lightColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-600",
      },
      {
        icon: TbAward,
        title: "Excellence",
        description: "Commitment to quality in every shipment",
        color: "bg-amber-500",
        lightColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-600",
      },
      {
        icon: TbBulb,
        title: "Innovation",
        description: "Leveraging technology for smarter logistics",
        color: "bg-purple-500",
        lightColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-600",
      },
      {
        icon: TbHeartHandshake,
        title: "Customer Focus",
        description: "Your success is our priority",
        color: "bg-rose-500",
        lightColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-600",
      },
      {
        icon: TbClock,
        title: "Reliability",
        description: "On-time delivery, every time",
        color: "bg-emerald-500",
        lightColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-600",
      },
      {
        icon: TbLeaf,
        title: "Sustainability",
        description: "Responsible logistics for a better tomorrow",
        color: "bg-teal-500",
        lightColor: "bg-teal-50",
        borderColor: "border-teal-200",
        textColor: "text-teal-600",
      },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Decorative element animation
      gsap.fromTo(
        decorRef.current,
        { rotate: 0 },
        {
          rotate: 360,
          duration: 60,
          repeat: -1,
          ease: "none",
        }
      );

      // Mission card animation
      const missionTl = gsap.timeline({
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      missionTl
        .fromTo(
          missionRef.current,
          { x: -100, opacity: 0, rotateY: 15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(
          missionRef.current.querySelector(".icon-wrapper"),
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.5"
        )
        .fromTo(
          missionRef.current.querySelector(".content-text"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      // Vision card animation
      const visionTl = gsap.timeline({
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      visionTl
        .fromTo(
          visionRef.current,
          { x: 100, opacity: 0, rotateY: -15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(
          visionRef.current.querySelector(".icon-wrapper"),
          { scale: 0, rotate: 180 },
          { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.5"
        )
        .fromTo(
          visionRef.current.querySelector(".content-text"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      // Values header animation
      gsap.fromTo(
        valuesHeaderRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesHeaderRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Values cards stagger animation with 3D effect
      valuesRef.current.forEach((card, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            rotateX: 45,
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: row * 0.2 + col * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover animation setup
        const icon = card.querySelector(".value-icon");
        const title = card.querySelector(".value-title");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, {
            rotate: 360,
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(title, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(title, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={decorRef}
          className="absolute -top-40 -right-40 w-80 h-80 border border-gray-200 rounded-full opacity-40"
        />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-gray-200 rounded-full opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-100 rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mb-16 md:mb-24">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 group"
            style={{ perspective: "1000px" }}
          >
            {/* Corner Accent */}
            <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-orange-500 rotate-45 transform origin-bottom-right" />
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Icon */}
              <div className="icon-wrapper w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors duration-300">
                <TbTarget className="w-8 h-8 text-orange-500" />
              </div>

              {/* Content */}
              <div className="content-text flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {data.mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  "{data.mission.statement}"
                </p>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-8 right-8 h-1 bg-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 group"
            style={{ perspective: "1000px" }}
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 -rotate-45 transform origin-bottom-left" />
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Icon */}
              <div className="icon-wrapper w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                <TbEye className="w-8 h-8 text-blue-500" />
              </div>

              {/* Content */}
              <div className="content-text flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {data.vision.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  "{data.vision.statement}"
                </p>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-8 right-8 h-1 bg-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          {/* Section Header */}
          <div ref={valuesHeaderRef} className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 mb-4 shadow-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              These principles guide every decision we make and every shipment
              we handle
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {data.values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (valuesRef.current[index] = el)}
                  className={`relative bg-white rounded-2xl p-6 border ${value.borderColor} hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden`}
                >
                  {/* Background Shape on Hover */}
                  <div
                    className={`absolute -right-8 -bottom-8 w-32 h-32 ${value.lightColor} rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`value-icon w-14 h-14 ${value.lightColor} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-7 h-7 ${value.textColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="value-title text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-white group-hover:text-gray-600 transition-colors duration-300">
                    0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
