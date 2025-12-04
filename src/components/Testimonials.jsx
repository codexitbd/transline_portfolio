import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbQuote, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import testimonialBg from "../assets/hero-2.webp";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote:
      "Their expertise in customs clearance saved us weeks of delay. Professional team, transparent pricing, and exceptional service quality.",
    name: "Rakib Hassan",
    designation: "Supply Chain Manager",
    company: "TechVision Industries",
    color: "#3B82F6",
  },
  {
    id: 2,
    quote:
      "Transline transformed our logistics operations. Their real-time tracking and proactive communication have been game-changers for our business.",
    name: "Sarah Chen",
    designation: "Operations Director",
    company: "GlobalTex Manufacturing",
    color: "#10B981",
  },
  {
    id: 3,
    quote:
      "We've partnered with Transline for over 5 years. Their reliability and expertise in handling complex shipments is unmatched in the industry.",
    name: "Michael Torres",
    designation: "Procurement Head",
    company: "Apex Electronics",
    color: "#8B5CF6",
  },
  {
    id: 4,
    quote:
      "From air freight to warehousing, Transline handles everything seamlessly. They've become an integral part of our supply chain success.",
    name: "Anika Rahman",
    designation: "Logistics Manager",
    company: "FreshFoods Export Ltd",
    color: "#F59E0B",
  },
  {
    id: 5,
    quote:
      "Outstanding service and competitive rates. Their team goes above and beyond to ensure our shipments arrive on time, every time.",
    name: "David Kim",
    designation: "CEO",
    company: "Pacific Trade Solutions",
    color: "#EF4444",
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 transition-all duration-500 ${
        isActive ? "opacity-100" : "opacity-0 absolute"
      }`}
      style={{ display: isActive ? "block" : "none" }}
    >
      {/* Quote Icon */}
      <div
        className="absolute -top-5 left-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
        style={{ backgroundColor: testimonial.color }}
      >
        <TbQuote className="w-6 h-6 text-white" />
      </div>

      {/* Quote */}
      <p className="text-white/90 text-lg md:text-xl leading-relaxed mt-4 mb-8 font-light">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ring-2 ring-white/20"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <p className="font-bold text-white">{testimonial.name}</p>
          <p className="text-sm text-white/60">
            {testimonial.designation}, {testimonial.company}
          </p>
        </div>
      </div>

      {/* Decorative accent */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10"
        style={{ backgroundColor: testimonial.color }}
      />
    </div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalTestimonials = testimonials.length;

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % totalTestimonials);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(goToNext, 6000);
    return () => clearInterval(autoplayRef.current);
  }, []);

  // Reset autoplay on manual navigation
  const handleNavigation = (direction) => {
    clearInterval(autoplayRef.current);
    if (direction === "next") goToNext();
    else goToPrev();
    autoplayRef.current = setInterval(goToNext, 6000);
  };

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const carousel = carouselRef.current;
    const bg = bgRef.current;

    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(carousel, { opacity: 0, y: 50 });

    // Parallax effect for background
    gsap.to(bg, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        carousel,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Parallax Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${testimonialBg})` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gray-900/85" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/50 via-transparent to-gray-900/50" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            What Our Clients Say
          </h2>
          <p ref={subtitleRef} className="text-gray-300 text-lg max-w-2xl mx-auto">
            Trusted by leading businesses worldwide for reliable logistics solutions.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Testimonial Cards */}
          <div className="relative min-h-80">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === current}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* Prev Button */}
            <button
              onClick={() => handleNavigation("prev")}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              <TbChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => {
                    clearInterval(autoplayRef.current);
                    setCurrent(index);
                    autoplayRef.current = setInterval(goToNext, 6000);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === current
                      ? "w-8"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  style={{
                    backgroundColor: index === current ? t.color : undefined,
                  }}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handleNavigation("next")}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              <TbChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
