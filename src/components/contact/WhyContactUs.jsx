import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbClock,
  TbHeadset,
  TbCurrencyDollar,
  TbSettings,
  TbCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: TbClock,
    title: "Fast Response",
    description: "Quotes within 2-4 hours",
    color: "orange",
  },
  {
    icon: TbHeadset,
    title: "Expert Advice",
    description: "Experienced team to guide you",
    color: "blue",
  },
  {
    icon: TbCurrencyDollar,
    title: "Transparent Pricing",
    description: "No hidden fees",
    color: "emerald",
  },
  {
    icon: TbSettings,
    title: "Customized Solutions",
    description: "Tailored to your specific needs",
    color: "purple",
  },
];

const WhyContactUs = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      orange: { bg: "bg-orange-50", icon: "bg-orange-100", text: "text-orange-600" },
      blue: { bg: "bg-blue-50", icon: "bg-blue-100", text: "text-blue-600" },
      emerald: { bg: "bg-emerald-50", icon: "bg-emerald-100", text: "text-emerald-600" },
      purple: { bg: "bg-purple-50", icon: "bg-purple-100", text: "text-purple-600" },
    };
    return colorMap[color] || colorMap.orange;
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbCheck className="w-4 h-4" />
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Contact Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the difference of working with a logistics partner committed to your success.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const colors = getColorClasses(benefit.color);
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`${colors.bg} rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow duration-500`}
              >
                <div
                  className={`${colors.icon} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className={`w-8 h-8 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyContactUs;
