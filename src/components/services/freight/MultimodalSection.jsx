import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbArrowsExchange,
  TbShip,
  TbPlane,
  TbTruck,
  TbTrain,
  TbCheck,
  TbCoin,
  TbUser,
  TbRefresh,
  TbPuzzle,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const MultimodalSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const benefitsRef = useRef([]);
  const connectionLinesRef = useRef([]);

  const solutions = [
    {
      icons: [TbShip, TbPlane],
      title: "Ocean + Air",
      description: "Transshipment flexibility combining ocean economy with air speed for time-critical portions",
      color: "from-blue-500 to-emerald-500",
    },
    {
      icons: [TbShip, TbTruck],
      title: "Ocean + Road",
      description: "Door-to-door inland delivery combining sea freight with ground transportation",
      color: "from-emerald-500 to-amber-500",
    },
    {
      icons: [TbPlane, TbTruck],
      title: "Air + Road",
      description: "Airport to final destination with seamless ground transfer services",
      color: "from-blue-500 to-rose-500",
    },
    {
      icons: [TbTrain, TbTruck],
      title: "Rail + Road",
      description: "Efficient rail corridors combined with last-mile truck delivery",
      color: "from-purple-500 to-amber-500",
    },
  ];

  const benefits = [
    { icon: TbCoin, text: "Optimized cost vs. time balance" },
    { icon: TbUser, text: "Single point of contact" },
    { icon: TbRefresh, text: "Seamless coordination" },
    { icon: TbPuzzle, text: "Reduced complexity" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icons = card.querySelectorAll(".mode-icon");
        const connector = card.querySelector(".connector");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
          }
        )
          .fromTo(
            icons,
            { scale: 0, rotation: -45 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          )
          .fromTo(
            connector,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.3"
          );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(icons, { 
            rotation: 10, 
            scale: 1.1, 
            duration: 0.3, 
            stagger: 0.05,
            ease: "power2.out" 
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icons, { 
            rotation: 0, 
            scale: 1, 
            duration: 0.3, 
            stagger: 0.05,
            ease: "power2.out" 
          });
        });
      });

      // Benefits animation
      benefitsRef.current.forEach((benefit, index) => {
        if (!benefit) return;
        gsap.fromTo(
          benefit,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: benefit,
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-6">
            <TbArrowsExchange className="w-8 h-8 text-white" />
          </div>
          <span className="block text-sm font-medium text-purple-600 uppercase tracking-wider mb-3">
            Integrated Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Multimodal Transport
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Combining multiple transport modes for optimized logistics, balancing cost 
            and speed while simplifying your supply chain management.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {solutions.map((solution, index) => {
            const [Icon1, Icon2] = solution.icons;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Icons with Connector */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="mode-icon w-16 h-16 bg-gray-100 group-hover:bg-purple-50 rounded-2xl flex items-center justify-center transition-colors duration-300">
                    <Icon1 className="w-8 h-8 text-gray-700 group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                  <div className="relative flex items-center">
                    <div 
                      className="connector w-12 h-1 rounded-full origin-left"
                      style={{ background: `linear-gradient(to right, ${solution.color.split(' ')[0].replace('from-', '#').replace('blue-500', '3B82F6').replace('emerald-500', '10B981').replace('amber-500', 'F59E0B').replace('rose-500', 'F43F5E').replace('purple-500', '8B5CF6')}, ${solution.color.split(' ')[1].replace('to-', '#').replace('blue-500', '3B82F6').replace('emerald-500', '10B981').replace('amber-500', 'F59E0B').replace('rose-500', 'F43F5E').replace('purple-500', '8B5CF6')})` }}
                    />
                    <TbArrowsExchange className="absolute left-1/2 -translate-x-1/2 w-5 h-5 text-gray-400 bg-white" />
                  </div>
                  <div className="mode-icon w-16 h-16 bg-gray-100 group-hover:bg-purple-50 rounded-2xl flex items-center justify-center transition-colors duration-300">
                    <Icon2 className="w-8 h-8 text-gray-700 group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
            Benefits of Multimodal Transport
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (benefitsRef.current[index] = el)}
                  className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultimodalSection;
