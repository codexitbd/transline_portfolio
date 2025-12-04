import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceIntro = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { value: "6+", label: "Core Services" },
    { value: "150+", label: "Countries Covered" },
    { value: "24/7", label: "Support Available" },
    { value: "100%", label: "Compliance Rate" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;

        gsap.fromTo(
          stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Comprehensive End-to-End Logistics Solutions Tailored to Your
              Business Needs
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                At Transline Global Logistics, we understand that every business
                has unique supply chain challenges. That's why we've built an
                integrated service portfolio that covers every aspect of
                logistics - from international freight forwarding to last-mile
                delivery.
              </p>
              <p>
                Our approach combines global expertise with local knowledge,
                advanced technology with personal service, and competitive
                pricing with uncompromising quality. Whether you're shipping a
                single container or managing complex multi-modal supply chains,
                we have the expertise and infrastructure to deliver.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;
