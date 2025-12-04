import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbTarget,
  TbEye,
  TbTrendingUp,
  TbWorld,
  TbCalendar,
  TbUsers,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CompanyProfile = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const storyCardsRef = useRef([]);
  const statsRef = useRef([]);
  const imageRef = useRef(null);
  const timelineRef = useRef([]);

  const companyData = {
    tagline: "Building Bridges in Global Trade Since 2005",
    story: [
      {
        icon: TbCalendar,
        title: "Our Beginning",
        content:
          "Founded in 2005 by a team of visionary entrepreneurs, Transline Global Logistics started as a small freight forwarding company in Dhaka, Bangladesh. With just a handful of dedicated employees and a passion for excellence, we set out to revolutionize the logistics landscape in South Asia.",
      },
      {
        icon: TbTrendingUp,
        title: "Evolution & Growth",
        content:
          "Over the years, we transformed from a traditional freight forwarder into an integrated supply chain solutions provider. We embraced technology, expanded our service portfolio, and built strategic partnerships with global carriers and logistics networks, enabling us to offer end-to-end solutions.",
      },
      {
        icon: TbWorld,
        title: "Global Reach",
        content:
          "Today, Transline operates across 50+ countries with a network of trusted partners worldwide. Our presence spans major trade routes connecting Asia, Europe, the Americas, and beyond. We handle over 100,000 shipments annually, serving industries from textiles to technology.",
      },
      {
        icon: TbEye,
        title: "Future Vision",
        content:
          "Looking ahead, we are committed to sustainable logistics practices and digital transformation. Our goal is to become the most trusted logistics partner in emerging markets, leveraging AI-driven solutions and green initiatives to shape the future of global trade.",
      },
    ],
    stats: [
      { value: "2005", label: "Year Founded" },
      { value: "50+", label: "Countries Served" },
      { value: "500+", label: "Team Members" },
      { value: "100K+", label: "Annual Shipments" },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Story cards stagger animation
      storyCardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(
          stat,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Timeline dots animation
      timelineRef.current.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
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
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {companyData.tagline}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            From humble beginnings to a leading logistics provider, our journey
            is defined by innovation, integrity, and an unwavering commitment to
            our clients.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Image & Stats */}
          <div className="space-y-8">
            {/* Company Image */}
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1974"
                alt="Transline Team"
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <TbTarget className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">19+</p>
                    <p className="text-sm text-gray-600">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
              {companyData.stats.map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="bg-gray-50 rounded-xl p-5 text-center hover:bg-orange-50 transition-colors duration-300 group"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Story Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />

            {/* Story Cards */}
            <div className="space-y-6">
              {companyData.story.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => (storyCardsRef.current[index] = el)}
                    className="relative flex gap-4 sm:gap-6 group"
                  >
                    {/* Timeline Dot */}
                    <div
                      ref={(el) => (timelineRef.current[index] = el)}
                      className="relative z-10 shrink-0"
                    >
                      <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-50 transition-all duration-300">
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-5 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 sm:ml-18 ml-0">
              <div className="flex items-center gap-4 p-5 bg-orange-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                  <TbUsers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Join Our Growing Team
                  </p>
                  <p className="text-sm text-gray-600">
                    Be part of our success story
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
