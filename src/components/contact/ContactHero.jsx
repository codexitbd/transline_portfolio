import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TbMessage, TbFileText, TbArrowDown } from "react-icons/tb";

const ContactHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial states
      gsap.set(titleRef.current, { y: 60, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 40, opacity: 0 });
      gsap.set(cardsRef.current?.children, { y: 50, opacity: 0 });
      gsap.set(scrollRef.current, { y: 20, opacity: 0 });

      // Animation sequence
      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1 }, 0.3)
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.5)
        .to(
          cardsRef.current?.children,
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          0.7
        )
        .to(scrollRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.2);

      // Floating animation for scroll indicator
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const actionCards = [
    {
      icon: TbMessage,
      title: "General Inquiry",
      description: "Questions, partnerships, or feedback",
      color: "orange",
    },
    {
      icon: TbFileText,
      title: "Get a Quote",
      description: "Request competitive shipping rates",
      color: "blue",
    },
  ];

  const scrollToForms = () => {
    document.getElementById("contact-forms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center bg-gray-50 overflow-hidden pt-24 pb-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-600">
            We typically respond within 2-4 hours
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Let's Start Your
          <br />
          <span className="text-orange-500">Logistics Journey</span> Today
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Get in touch for personalized supply chain solutions. Our expert team
          is ready to help optimize your shipping operations.
        </p>

        {/* Action Cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16"
        >
          {actionCards.map((card, index) => (
            <button
              key={index}
              onClick={scrollToForms}
              className={`group p-6 bg-white rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-xl ${
                card.color === "orange"
                  ? "border-orange-100 hover:border-orange-300"
                  : "border-blue-100 hover:border-blue-300"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  card.color === "orange" ? "bg-orange-100" : "bg-blue-100"
                }`}
              >
                <card.icon
                  className={`w-7 h-7 ${
                    card.color === "orange" ? "text-orange-600" : "text-blue-600"
                  }`}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          ref={scrollRef}
          onClick={scrollToForms}
          className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <TbArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ContactHero;
