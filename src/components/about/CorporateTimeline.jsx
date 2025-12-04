import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBuilding,
  TbCertificate,
  TbPlane,
  TbPackages,
  TbDeviceAnalytics,
  TbTrophy,
  TbMapPin,
  TbRocket,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CorporateTimeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const headingRef = useRef(null);
  const milestonesRef = useRef([]);
  const yearsRef = useRef([]);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  const milestones = [
    {
      year: "2005",
      title: "The Beginning",
      description:
        "Transline Global Logistics was founded with a vision to revolutionize freight forwarding in Bangladesh. Our first warehouse in Dhaka marked the start of an incredible journey.",
      icon: TbBuilding,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      year: "2008",
      title: "Quality Certified",
      description:
        "Achieved ISO 9001:2008 certification, establishing our commitment to international quality standards and operational excellence in logistics management.",
      icon: TbCertificate,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      year: "2011",
      title: "Taking to the Skies",
      description:
        "Expanded our services to include air freight operations, partnering with major airlines to offer faster delivery options for time-sensitive cargo.",
      icon: TbPlane,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      year: "2014",
      title: "CFS Operations Launch",
      description:
        "Opened our state-of-the-art Container Freight Station, providing comprehensive consolidation, deconsolidation, and warehousing services.",
      icon: TbPackages,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      year: "2017",
      title: "Digital Transformation",
      description:
        "Launched our proprietary digital tracking platform, enabling real-time shipment visibility and automated notifications for customers worldwide.",
      icon: TbDeviceAnalytics,
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
    },
    {
      year: "2020",
      title: "Major Milestone",
      description:
        "Celebrated processing over 100,000 shipments, a testament to the trust our clients place in us and our team's dedication to excellence.",
      icon: TbTrophy,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description:
        "Opened our Chittagong branch office, strategically positioned near the country's largest seaport to better serve our growing client base.",
      icon: TbMapPin,
      color: "bg-teal-500",
      lightColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      year: "2025",
      title: "Future Forward",
      description:
        "Today, we operate across 50+ countries with plans to introduce AI-powered logistics solutions and expand our sustainable shipping initiatives.",
      icon: TbRocket,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      isCurrent: true,
    },
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
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Progress line animation
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      // Milestone animations
      milestonesRef.current.forEach((milestone, index) => {
        const isEven = index % 2 === 0;
        const year = yearsRef.current[index];
        const card = cardsRef.current[index];
        const icon = iconsRef.current[index];

        // Create timeline for each milestone
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: milestone,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        });

        // Year animation - slide from side
        tl.fromTo(
          year,
          {
            x: isEven ? -100 : 100,
            opacity: 0,
            scale: 0.5,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        // Icon animation - pop in with rotation
        tl.fromTo(
          icon,
          {
            scale: 0,
            rotate: -180,
          },
          {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

        // Card animation - slide and fade
        tl.fromTo(
          card,
          {
            x: isEven ? 100 : -100,
            opacity: 0,
            rotateY: isEven ? 15 : -15,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

        // Parallax effect on scroll
        gsap.to(card, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: milestone,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-sm mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Corporate History
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Two decades of growth, innovation, and commitment to excellence in
            global logistics
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-orange-500 origin-top"
              style={{ height: "100%" }}
            />
          </div>

          {/* Center Line - Mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gray-200">
            <div
              className="absolute top-0 left-0 w-full bg-orange-500 origin-top"
              style={{ height: "100%", transform: "scaleY(var(--progress, 0))" }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (milestonesRef.current[index] = el)}
                  className={`relative flex items-center md:items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } md:mb-16`}
                >
                  {/* Year - Desktop */}
                  <div
                    ref={(el) => (yearsRef.current[index] = el)}
                    className={`hidden md:flex w-1/2 ${
                      isEven ? "justify-end pr-12" : "justify-start pl-12"
                    }`}
                  >
                    <div
                      className={`relative ${
                        isEven ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`text-6xl lg:text-7xl font-bold ${milestone.textColor} opacity-20`}
                      >
                        {milestone.year}
                      </span>
                      <div
                        className={`absolute ${
                          isEven ? "right-0" : "left-0"
                        } bottom-0 text-2xl lg:text-3xl font-bold text-gray-900`}
                      >
                        {milestone.year}
                      </div>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div
                    ref={(el) => (iconsRef.current[index] = el)}
                    className={`absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10 ${
                      milestone.isCurrent ? "animate-pulse" : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 ${milestone.color} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white`}
                    >
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`ml-20 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-12" : "md:pr-12"
                    }`}
                    style={{ perspective: "1000px" }}
                  >
                    <div
                      className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group relative overflow-hidden ${
                        milestone.isCurrent ? "ring-2 ring-orange-500 ring-offset-2" : ""
                      }`}
                    >
                      {/* Background accent */}
                      <div
                        className={`absolute top-0 ${
                          isEven ? "right-0" : "left-0"
                        } w-24 h-24 ${milestone.lightColor} rounded-full -translate-y-1/2 ${
                          isEven ? "translate-x-1/2" : "-translate-x-1/2"
                        } opacity-50 group-hover:scale-150 transition-transform duration-500`}
                      />

                      {/* Mobile Year */}
                      <div className="md:hidden mb-3">
                        <span
                          className={`text-sm font-semibold ${milestone.textColor}`}
                        >
                          {milestone.year}
                        </span>
                        {milestone.isCurrent && (
                          <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                            Present
                          </span>
                        )}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                            {milestone.title}
                          </h3>
                          {milestone.isCurrent && (
                            <span className="hidden md:inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                              Present
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {milestone.description}
                        </p>
                      </div>

                      {/* Connector line to center - Desktop */}
                      <div
                        className={`hidden md:block absolute top-8 ${
                          isEven ? "-left-12" : "-right-12"
                        } w-12 h-px bg-gray-200`}
                      >
                        <div
                          className={`absolute ${
                            isEven ? "right-0" : "left-0"
                          } top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End marker */}
          <div className="hidden md:flex justify-center mt-8">
            <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to be part of our next chapter?
          </p>
          <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default CorporateTimeline;
