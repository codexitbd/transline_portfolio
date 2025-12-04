import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbArrowRight, TbPhone, TbMail } from "react-icons/tb";
import Button from "./Button";
import ctaBg from "../assets/hero-1.webp";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;

    // Initial states
    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(buttons, { opacity: 0, y: 30 });

    // Scroll-triggered entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
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
        buttons,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // 3D mouse movement effect
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation (subtle effect)
      const rotateX = (mouseY / rect.height) * -8;
      const rotateY = (mouseX / rect.width) * 8;

      // Calculate background movement (parallax)
      const moveX = (mouseX / rect.width) * 30;
      const moveY = (mouseY / rect.height) * 30;

      gsap.to(container, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      gsap.to(bg, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(container, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.to(bg, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gray-900 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-6 lg:px-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* CTA Card with 3D effect */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image with parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              ref={bgRef}
              className="absolute -inset-10 bg-cover bg-center will-change-transform scale-110"
              style={{ backgroundImage: `url(${ctaBg})` }}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 via-blue-800/85 to-purple-900/90" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20" />
          </div>

          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan-400/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10 py-16 md:py-24 px-8 md:px-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Free Consultation Available
              </span>
            </div>

            {/* Headline */}
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Ready to Optimize Your
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                Supply Chain?
              </span>
            </h2>

            {/* Subtext */}
            <p
              ref={subtitleRef}
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Get expert consultation and customized logistics solutions tailored
              to your business needs. Our team is ready to help you succeed.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                title="Request a Quote"
                rightIcon={<TbArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
                containerClass="!bg-white !text-gray-900 hover:!bg-gray-100 !px-8 !py-4 !text-sm font-bold shadow-xl shadow-black/20"
              />
              <Button
                title="Contact Us Today"
                leftIcon={<TbPhone className="mr-2 w-5 h-5" />}
                containerClass="!bg-transparent !text-white border-2 border-white/30 hover:!bg-white/10 hover:border-white/50 !px-8 !py-4 !text-sm font-bold"
              />
            </div>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-white/60">
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-2 hover:text-white transition-colors duration-300"
              >
                <TbPhone className="w-5 h-5" />
                <span>+880 1234 567 890</span>
              </a>
              <span className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
              <a
                href="mailto:info@transline.com"
                className="flex items-center gap-2 hover:text-white transition-colors duration-300"
              >
                <TbMail className="w-5 h-5" />
                <span>info@transline.com</span>
              </a>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
        </div>
      </div>

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default CTASection;
