import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceIntroduction = ({ title, description, highlights = [] }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const highlightsRef = useRef([]);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Decorative line animation
      gsap.fromTo(
        decorRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Highlights stagger animation
      highlightsRef.current.forEach((highlight, index) => {
        if (!highlight) return;
        gsap.fromTo(
          highlight,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: highlight,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div
              ref={decorRef}
              className="w-24 h-1 bg-orange-500 rounded-full origin-left"
            />
          </div>

          {/* Content */}
          <div ref={contentRef} className="text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h2>
            )}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
              {description}
            </p>
          </div>

          {/* Highlights Grid */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (highlightsRef.current[index] = el)}
                  className="group text-center p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceIntroduction;
