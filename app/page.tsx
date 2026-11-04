"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Star,
  ArrowRight,
  Heart,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  ChevronLeft,
  Calendar,
  Users,
  Search,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const leftPhoneRef = useRef<HTMLDivElement>(null);
  const rightPhoneRef = useRef<HTMLDivElement>(null);
  const ambientAmberRef = useRef<HTMLDivElement>(null);
  const ambientEmeraldRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const bookAnywhereRef = useRef<HTMLElement>(null);
  const touchSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  // Interactive UI state
  const [activeTab, setActiveTab] = useState<"discover" | "favourites" | "bookings">("discover");
  const [favoriteCards, setFavoriteCards] = useState<Record<string, boolean>>({
    ritz: true,
    balcony: false,
    detailRitz: true,
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchCity, setSearchCity] = useState("Paris");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Track scroll for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations with scoping and matchMedia for accessibility
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Respect prefers-reduced-motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Fallback: simple fade-in for reduced motion
        gsap.set("[data-animate]", { opacity: 1, y: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ==========================================
        // 1. HERO SECTION ENTRANCE & TIMELINE
        // ==========================================
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Staggered text reveal for headline
        heroTl
          .from(".hero-badge", {
            opacity: 0,
            y: 20,
            duration: 0.9,
            delay: 0.2,
          })
          .from(
            ".hero-title-line",
            {
              y: 60,
              opacity: 0,
              stagger: 0.15,
              duration: 1.1,
              ease: "power4.out",
            },
            "-=0.6"
          )
          .from(
            ".hero-description",
            {
              opacity: 0,
              y: 25,
              duration: 0.9,
            },
            "-=0.7"
          )
          .from(
            ".hero-cta-btn",
            {
              opacity: 0,
              y: 20,
              stagger: 0.12,
              duration: 0.8,
            },
            "-=0.6"
          )
          .from(
            ".hero-trust-indicator",
            {
              opacity: 0,
              y: 15,
              duration: 0.8,
            },
            "-=0.5"
          );

        // Mockups 3D-like entrance
        if (leftPhoneRef.current && rightPhoneRef.current) {
          gsap.from(leftPhoneRef.current, {
            opacity: 0,
            y: 80,
            rotation: -8,
            scale: 0.92,
            duration: 1.4,
            ease: "power3.out",
            delay: 0.5,
          });

          gsap.from(rightPhoneRef.current, {
            opacity: 0,
            y: 90,
            rotation: 8,
            scale: 0.92,
            duration: 1.4,
            ease: "power3.out",
            delay: 0.65,
          });

          // Continuous subtle floating animation for hero cards
          gsap.to(leftPhoneRef.current, {
            y: "-=12",
            rotation: "-=1",
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.8,
          });

          gsap.to(rightPhoneRef.current, {
            y: "+=12",
            rotation: "+=1",
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2.1,
          });
        }

        // Parallax ambient light backgrounds on scroll
        if (ambientAmberRef.current && ambientEmeraldRef.current) {
          gsap.to(ambientAmberRef.current, {
            y: 120,
            scale: 1.2,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          gsap.to(ambientEmeraldRef.current, {
            y: 180,
            scale: 0.85,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 2,
            },
          });
        }

        // ==========================================
        // 2. HOW IT WORKS SECTION (SCROLL TRIGGER)
        // ==========================================
        if (howItWorksRef.current) {
          // Header reveal
          gsap.from(".how-header", {
            scrollTrigger: {
              trigger: howItWorksRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
          });

          // Left curation card reveal
          gsap.from(".curation-card", {
            scrollTrigger: {
              trigger: ".curation-card",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: -40,
            duration: 1.1,
            ease: "power3.out",
          });

          // Right showcase container
          gsap.from(".showcase-container", {
            scrollTrigger: {
              trigger: ".showcase-container",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: 40,
            duration: 1.1,
            ease: "power3.out",
          });

          // Staggered reveal for hotel cards in the showcase
          gsap.from(".showcase-hotel-card", {
            scrollTrigger: {
              trigger: ".showcase-container",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 40,
            scale: 0.94,
            stagger: 0.18,
            duration: 1,
            ease: "power3.out",
          });
        }

        // ==========================================
        // 3. BOOK ANYWHERE SECTION (SCROLL TRIGGER)
        // ==========================================
        if (bookAnywhereRef.current) {
          const bookContainer = bookAnywhereRef.current.querySelector(".book-container");

          gsap.from(bookContainer, {
            scrollTrigger: {
              trigger: bookAnywhereRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            scale: 0.96,
            duration: 1.2,
            ease: "power3.out",
          });

          // Booking preview breakdown card
          gsap.from(".booking-detail-card", {
            scrollTrigger: {
              trigger: ".booking-detail-card",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out",
          });

          // Editorial pillars stagger
          gsap.from(".pillar-item", {
            scrollTrigger: {
              trigger: ".pillars-grid",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
          });
        }

        // ==========================================
        // 4. GET IN TOUCH PROGRESSIVE LINES
        // ==========================================
        if (touchSectionRef.current) {
          const touchTl = gsap.timeline({
            scrollTrigger: {
              trigger: touchSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          touchTl
            .from(".touch-heading", {
              opacity: 0,
              y: 30,
              duration: 1,
              ease: "power3.out",
            })
            .fromTo(
              lineLeftRef.current,
              { scaleX: 0, transformOrigin: "right center" },
              { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
              "-=0.7"
            )
            .fromTo(
              lineRightRef.current,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
              "-=1.1"
            )
            .from(
              ".touch-sub",
              {
                opacity: 0,
                y: 15,
                duration: 0.8,
              },
              "-=0.5"
            );
        }

        // ==========================================
        // 5. FOOTER ENTRANCE & SKYLINE
        // ==========================================
        if (footerRef.current) {
          gsap.from(".footer-column", {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.from(".footer-skyline", {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 40,
            duration: 1.6,
            ease: "power2.out",
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0c] text-[#f6f3ed] overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. SITE NAVIGATION */}
      {/* ======================================================== */}
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-[#0a0a0c]/95 backdrop-blur-md border-white/10 shadow-2xl py-3.5"
          : "bg-[#0a0a0c]/70 backdrop-blur-md border-white/5 py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="font-editorial text-2xl tracking-[0.25em] font-medium uppercase text-white hover:text-[#c5bfb4] transition-colors flex items-center gap-2 group"
          >
            <span className="relative">
              STAY ROUTE
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </span>
          </a>

          {/* Central Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-9 text-xs uppercase tracking-luxury text-[#c5bfb4]"
          >
            <a href="#about" className="hover-luxury-link hover:text-white transition-colors duration-200">
              About
            </a>
            <a href="#about" className="hover-luxury-link hover:text-white transition-colors duration-200">
              Home
            </a>
            <a href="#stays" className="hover-luxury-link hover:text-white transition-colors duration-200">
              Stays
            </a>
            <a href="#features" className="hover-luxury-link hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#destinations" className="hover-luxury-link hover:text-white transition-colors duration-200">
              Destinations
            </a>
          </nav>

          {/* Utility Links & Actions */}
          <div className="flex items-center space-x-6 text-xs uppercase tracking-luxury">
            <a
              href="#contact"
              className="hidden sm:inline-block text-[#c5bfb4] hover:text-white transition-colors duration-200 hover-luxury-link"
            >
              Contact
            </a>
            <a
              href="#login"
              className="hidden sm:inline-block text-white hover:text-[#c5bfb4] transition-colors duration-200 font-medium px-4 py-2 border border-white/10 rounded-full hover:border-white/30"
            >
              Log In
            </a>
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white p-2 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0c]/98 border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-luxury text-[#c5bfb4]">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                About
              </a>
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white py-1 font-medium"
              >
                Home
              </a>
              <a
                href="#stays"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Stays
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Features
              </a>
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Destinations
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Contact
              </a>
              <div className="pt-2">
                <a
                  href="#login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 bg-white text-black font-semibold rounded-lg text-xs"
                >
                  Log In
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 2. HERO SECTION */}
      {/* ======================================================== */}
      <main className="relative z-10 pt-20">
        <section
          ref={heroRef}
          id="home"
          className="relative min-h-[92vh] flex items-center bg-chandelier-pattern overflow-hidden pt-12 pb-24"
        >
          {/* Ambient light backdrop overlays with parallax */}
          <div
            ref={ambientAmberRef}
            className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"
          />
          <div
            ref={ambientEmeraldRef}
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-950/25 rounded-full blur-[160px] pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Editorial Headline & CTAs */}
              <div className="lg:col-span-6 space-y-8 z-10">
                <div className="space-y-4">


                  <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.04] text-white font-normal uppercase overflow-hidden">
                    <span className="hero-title-line block">Discover</span>
                    <span className="hero-title-line block">
                      Stays{" "}
                      <span className="italic font-light text-[#f6f3ed] capitalize tracking-normal text-amber-100/90">
                        Made Simple
                      </span>
                    </span>
                  </h1>
                </div>

                <p className="hero-description text-[#c5bfb4] text-sm sm:text-base leading-relaxed max-w-lg font-light">
                  Find the perfect hotel in minutes, compare prices instantly, and book your stay with
                  total confidence and clear, transparent booking details.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#download"
                    className="hero-cta-btn inline-flex items-center justify-center bg-white text-[#0a0a0c] px-7 py-3.5 text-xs font-semibold tracking-editorial uppercase hover:bg-[#f6f3ed] shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Download App
                  </a>
                  <a
                    href="#stays"
                    className="hero-cta-btn inline-flex items-center justify-center bg-transparent border border-white/20 text-white px-7 py-3.5 text-xs font-medium tracking-editorial uppercase hover:border-white hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Explore Hotels
                  </a>
                </div>

                {/* Client Review & Trust Micro-Indicator */}
                <div className="hero-trust-indicator pt-6 border-t border-white/10 flex items-center gap-5 text-xs text-[#c5bfb4]">
                  <div className="flex items-center text-amber-300 text-xs gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#d4af37]" />
                    ))}
                  </div>
                  <span className="tracking-wide">
                    Rated <strong className="text-white font-semibold">4.9/5</strong> by over 14,000+
                    luxury travelers
                  </span>
                </div>
              </div>

              {/* Right Column: Dual Device/App UI Showcase Mockup */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-[540px] flex items-center justify-center py-6">
                  {/* First UI Card: Stays Search & Feed Screen (Left mobile frame) */}
                  <div
                    ref={leftPhoneRef}
                    className="glass-phone w-[265px] sm:w-[285px] rounded-[38px] p-4 text-[#f6f3ed] z-20 -mr-10 sm:-mr-14 transform -rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl"
                  >
                    {/* App status bar */}
                    <div className="flex items-center justify-between text-[11px] text-white/50 px-2 pt-1 pb-3">
                      <ChevronLeft className="w-3 h-3 text-white/70" />
                      <span className="font-medium text-white text-xs tracking-wider">Stays</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        <span className="text-[10px]">29</span>
                      </div>
                    </div>

                    {/* Internal Search Tabs */}
                    <div className="flex bg-black/40 p-0.5 rounded-full text-[10px] mb-3 text-center border border-white/5">
                      <button
                        onClick={() => setActiveTab("discover")}
                        className={`w-1/3 py-1 rounded-full font-medium transition-all duration-200 ${activeTab === "discover"
                          ? "bg-white/15 text-white shadow-sm"
                          : "text-white/50 hover:text-white"
                          }`}
                      >
                        Discover
                      </button>
                      <button
                        onClick={() => setActiveTab("favourites")}
                        className={`w-1/3 py-1 rounded-full font-medium transition-all duration-200 ${activeTab === "favourites"
                          ? "bg-white/15 text-white shadow-sm"
                          : "text-white/50 hover:text-white"
                          }`}
                      >
                        Favourites
                      </button>
                      <button
                        onClick={() => setActiveTab("bookings")}
                        className={`w-1/3 py-1 rounded-full font-medium transition-all duration-200 ${activeTab === "bookings"
                          ? "bg-white/15 text-white shadow-sm"
                          : "text-white/50 hover:text-white"
                          }`}
                      >
                        Bookings
                      </button>
                    </div>

                    {/* Search Input Field Mock */}
                    <div className="relative mb-2">
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-3 pr-8 text-[11px] text-white/80 focus:outline-none focus:border-white/30 transition-colors"
                        readOnly
                        type="text"
                        value="e.g. 'Paris' or 'Four S...'"
                      />
                      <Search className="w-3 h-3 absolute right-3 top-2.5 text-white/40" />
                    </div>

                    {/* Date & Guest Selector */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                        <span>Jan 5 - Jan 10</span>
                        <Calendar className="w-3 h-3 text-white/40" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                        <span>2 Guests</span>
                        <Users className="w-3 h-3 text-white/40" />
                      </div>
                    </div>

                    {/* Search Action Button */}
                    <button className="w-full bg-white text-[#0a0a0c] font-semibold text-[11px] py-2 rounded-xl mb-4 uppercase tracking-wider hover:bg-[#f6f3ed] active:scale-[0.98] transition-all shadow-md">
                      Search
                    </button>

                    {/* Section: Top Deals */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] px-0.5 font-medium">
                        <span>Top deals</span>
                        <span className="text-[10px] text-white/40 hover:text-white cursor-pointer transition-colors">
                          View all
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Hotel Deal 1 */}
                        <div className="bg-white/5 border border-white/5 rounded-xl p-1.5 group hover:border-white/20 transition-all duration-300">
                          <div className="h-20 rounded-lg overflow-hidden relative mb-1.5 bg-neutral-900">
                            <Image
                              src="/images/four-seasons.jpg"
                              alt="Four Seasons Paris"
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 120px, 140px"
                              priority
                            />
                          </div>
                          <div className="px-0.5">
                            <h4 className="text-[10px] font-semibold text-white truncate">
                              Four Seasons
                            </h4>
                            <p className="text-[9px] text-white/50">Paris</p>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-[9px] font-medium text-[#f6f3ed]">$1,240</span>
                              <button
                                aria-label="View hotel details"
                                className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px] hover:bg-white hover:text-black transition-colors"
                              >
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Hotel Deal 2 */}
                        <div className="bg-white/5 border border-white/5 rounded-xl p-1.5 group hover:border-white/20 transition-all duration-300">
                          <div className="h-20 rounded-lg overflow-hidden relative mb-1.5 bg-neutral-900">
                            <Image
                              src="/images/royal-hotel-paris.jpg"
                              alt="Royal Hotel Paris"
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 120px, 140px"
                              priority
                            />
                          </div>
                          <div className="px-0.5">
                            <h4 className="text-[10px] font-semibold text-white truncate">
                              Royal hotel
                            </h4>
                            <p className="text-[9px] text-white/50">Paris</p>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-[9px] font-medium text-[#f6f3ed]">$980</span>
                              <button
                                aria-label="View hotel details"
                                className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px] hover:bg-white hover:text-black transition-colors"
                              >
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second UI Card: Stays For You & Detail Screen (Right mobile frame) */}
                  <div
                    ref={rightPhoneRef}
                    className="glass-phone w-[275px] sm:w-[295px] rounded-[38px] p-4 text-[#f6f3ed] z-30 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-white/15"
                  >
                    {/* Header with city dropdown */}
                    <div className="flex items-center justify-between text-[11px] pb-3 mb-1 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <ChevronLeft className="w-3 h-3 text-white/50" />
                        <span className="font-medium text-white text-xs">Stays for you</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="Filter stays"
                          className="text-white/60 hover:text-white p-1 rounded transition-colors"
                        >
                          <SlidersHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Destination selector dropdown pill */}
                    <div className="relative mb-3">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex justify-between items-center bg-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white/90 border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3 h-3 text-amber-300" /> {searchCity}
                        </span>
                        <ChevronDown className="w-3 h-3 text-white/40" />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#16161a] border border-white/10 rounded-lg p-1 z-50 shadow-xl text-left">
                          {["Paris", "New York", "Tokyo", "London"].map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                setSearchCity(city);
                                setDropdownOpen(false);
                              }}
                              className="w-full text-left px-2 py-1 text-[10px] text-white/80 hover:bg-white/10 rounded flex items-center justify-between"
                            >
                              {city}
                              {searchCity === city && <Check className="w-2.5 h-2.5 text-amber-300" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Featured Large Hotel Card: Ritz Paris */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-2 mb-3 group hover:border-white/20 transition-all">
                      <div className="h-28 rounded-xl overflow-hidden relative mb-2">
                        <Image
                          src="/images/ritz-paris.jpg"
                          alt="Ritz Paris Interior"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 250px, 280px"
                          priority
                        />
                        {/* Photo index badge */}
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-white font-medium">
                          10/250
                        </span>
                        {/* Heart button */}
                        <button
                          onClick={(e) => toggleFavorite("ritz", e)}
                          aria-label="Add to favorites"
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-red-400 transition-colors"
                        >
                          <Heart
                            className={`w-3 h-3 transition-colors ${favoriteCards.ritz ? "fill-red-500 text-red-500" : ""
                              }`}
                          />
                        </button>
                      </div>

                      <div className="space-y-1 px-1">
                        <div className="flex items-center justify-between text-[9px] text-white/50">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-white/50" /> Paris • 500 m from centre
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-editorial text-base font-semibold text-white tracking-wide">
                            Ritz
                          </h4>
                          <div className="text-[9px] text-[#d4af37] flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 fill-current" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <div className="text-[9px] text-white/50">9.8 (1.2k reviews)</div>
                            <div className="text-[9px] text-white/40">
                              Points you earn: <span className="text-amber-200">1,680</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] text-white/40">Price</div>
                            <div className="text-sm font-semibold text-white">$8,400</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Preview Card: Eiffel view suite */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-2 opacity-90 group hover:opacity-100 transition-opacity">
                      <div className="h-16 rounded-xl overflow-hidden relative">
                        <Image
                          src="/images/paris-balcony.jpg"
                          alt="Paris Balcony View"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 250px, 280px"
                        />
                        <span className="absolute top-1.5 left-2 bg-black/60 backdrop-blur-md text-[8px] px-1.5 py-0.5 rounded-full text-white">
                          10/250
                        </span>
                        <button
                          onClick={(e) => toggleFavorite("balcony", e)}
                          aria-label="Add to favorites"
                          className="absolute top-1.5 right-2 text-white/80 hover:text-red-400 transition-colors"
                        >
                          <Heart
                            className={`w-3 h-3 ${favoriteCards.balcony ? "fill-red-500 text-red-500" : ""
                              }`}
                          />
                        </button>
                        <div className="absolute bottom-1.5 left-2 text-[9px] text-white font-medium bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                          Paris • 100m from centre
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. HOW IT WORKS SECTION */}
        {/* ======================================================== */}
        <section
          ref={howItWorksRef}
          id="features"
          className="py-28 relative bg-[#0a0a0c] border-t border-white/5 architectural-grid"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className="how-header text-center max-w-2xl mx-auto space-y-4 mb-20">
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase font-light text-white">
                How It Works
              </h2>
              <p className="text-[#c5bfb4] text-sm sm:text-base font-light leading-relaxed">
                Discover unique stays, search by destination and dates, then book instantly with secure
                payments and flexible cancellation options.
              </p>
            </div>

            {/* Split Grid Presentation: Feature Teaser & Interactive Olive Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Column 1: Feature Description */}
              <div className="curation-card lg:col-span-4 bg-[#16161a]/70 border border-white/5 p-8 lg:p-10 rounded-2xl flex flex-col justify-between backdrop-blur-sm shadow-xl">
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-semibold block">
                    Curation
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl uppercase text-white font-normal leading-tight">
                    Discover <br />
                    Unique Stays
                  </h3>
                  <p className="text-[#c5bfb4] text-xs sm:text-sm leading-relaxed font-light">
                    Explore handpicked hotels worldwide with detailed photos, amenities, and real guest
                    reviews you can trust, helping you confidently choose the perfect stay.
                  </p>
                </div>

                <div className="pt-8">
                  <a
                    href="#stays"
                    className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-lg text-xs uppercase tracking-wider text-white hover:bg-white hover:text-[#0a0a0c] transition-all duration-300 group shadow-md"
                  >
                    <span>Browse Hotels</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Column 2: Rich Dark Green / Olive Ambient Showcase Card */}
              <div className="showcase-container lg:col-span-8 bg-[#1b2a22] border border-emerald-900/40 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-center shadow-2xl">
                {/* Ambient green glow in background */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Cards Carousel/Grid View matching original reference visual */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                    {/* Secondary Hotel Card 1: Vestin */}
                    <div className="showcase-hotel-card bg-black/40 border border-white/10 rounded-2xl p-3 backdrop-blur-sm group hover:border-white/30 hover:-translate-y-1">
                      <div className="h-36 rounded-xl overflow-hidden relative mb-3 bg-neutral-900">
                        <Image
                          src="/images/vestin-hotel.jpg"
                          alt="Vestin Hotel"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 220px"
                        />
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <div>
                          <h4 className="font-editorial text-lg text-white font-medium">Vestin</h4>
                          <p className="text-[10px] text-white/50">Brooklyn, NY</p>
                        </div>
                        <button
                          aria-label="View Vestin"
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#0a0a0c] text-white flex items-center justify-center transition-colors"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Primary Highlight Hotel Card: Royal Hotel Paris (Taller, Prominent) */}
                    <div className="showcase-hotel-card bg-black/60 border border-white/20 rounded-2xl p-4 backdrop-blur-md shadow-2xl relative md:-my-2 transform md:scale-105 z-10 hover:border-white/40">
                      <div className="h-44 rounded-xl overflow-hidden relative mb-3 bg-neutral-900">
                        <Image
                          src="/images/royal-hotel-lounge.jpg"
                          alt="Royal Hotel Lounge"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 250px"
                        />
                        <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" /> 4.9
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <div>
                          <h4 className="font-editorial text-xl text-white font-medium tracking-wide">
                            Royal hotel
                          </h4>
                          <p className="text-[11px] text-white/60">Paris, France</p>
                        </div>
                        <button
                          aria-label="View Royal Hotel"
                          className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-[#0a0a0c] text-white flex items-center justify-center transition-colors shadow-md"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Secondary Hotel Card 3: Minor Hotels */}
                    <div className="showcase-hotel-card bg-black/40 border border-white/10 rounded-2xl p-3 backdrop-blur-sm group hover:border-white/30 hover:-translate-y-1">
                      <div className="h-36 rounded-xl overflow-hidden relative mb-3 bg-neutral-900">
                        <Image
                          src="/images/minor-hotel.jpg"
                          alt="Minor Hotels Suite"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 220px"
                        />
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <div>
                          <h4 className="font-editorial text-lg text-white font-medium">Minor Hotels</h4>
                          <p className="text-[10px] text-white/50">New York</p>
                        </div>
                        <button
                          aria-label="View Minor Hotels"
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#0a0a0c] text-white flex items-center justify-center transition-colors"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. BOOK ANYWHERE SECTION */}
        {/* ======================================================== */}
        <section
          ref={bookAnywhereRef}
          id="download"
          className="py-24 relative bg-[#0a0a0c] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Large Dark Burgundy/Plum Container Card */}
            <div className="book-container bg-[#27161c] border border-[#381f28] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              {/* Plum ambient lighting */}
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-red-950/40 rounded-full blur-[120px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Left Column: Detailed Reservation Breakdown Card (Mockup) */}
                <div className="lg:col-span-6 flex justify-center lg:justify-start">
                  <div className="booking-detail-card w-full max-w-sm bg-[#0a0a0c]/90 border border-white/15 rounded-3xl p-5 shadow-2xl text-white backdrop-blur-md">
                    {/* Main Hotel Imagery */}
                    <div className="h-56 sm:h-64 rounded-2xl overflow-hidden relative mb-4 group">
                      <Image
                        src="/images/ritz-lounge.jpg"
                        alt="Ritz Lounge Experience"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 340px, 380px"
                      />
                      {/* Top Badge: Favorite Heart */}
                      <button
                        onClick={(e) => toggleFavorite("detailRitz", e)}
                        aria-label="Save to wishlist"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-red-400 border border-white/10 transition-colors"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${favoriteCards.detailRitz ? "fill-red-500 text-red-500" : ""
                            }`}
                        />
                      </button>
                      {/* Image counter */}
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white/90 font-medium flex items-center gap-1.5 border border-white/10">
                        <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                        <span>1/58</span>
                      </div>
                    </div>

                    {/* Hotel Header and Review Metrics */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h4 className="font-editorial text-2xl font-normal text-white">Ritz</h4>
                        <p className="text-[11px] text-[#c5bfb4] mt-0.5">
                          9.8 <span className="text-white/40">(1.2k reviews)</span>
                        </p>
                      </div>
                      <div className="text-[#d4af37] text-xs flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Booking Meta Details */}
                    <div className="py-3.5 space-y-2.5 text-xs text-[#c5bfb4] border-b border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Dates</span>
                        <span className="font-medium text-white">Jan 21 - Jan 28, 2026</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Booking for</span>
                        <span className="font-medium text-white">2 guests</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Price</span>
                        <span className="font-semibold text-lg text-white">$8,400</span>
                      </div>
                    </div>

                    {/* Loyalty Rewards Points Row */}
                    <div className="pt-3 flex justify-between items-center text-xs">
                      <span className="text-[#c5bfb4]">Points you earn</span>
                      <div className="flex items-center gap-1.5 text-amber-200 font-medium">
                        <span className="w-2 h-2 rounded-full bg-amber-300" />
                        <span>1,680</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Editorial Value Proposition & Metrics */}
                <div className="lg:col-span-6 space-y-8 lg:pl-6 text-left">
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/50 font-medium block">
                      Seamless Mobility
                    </span>
                    <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl uppercase text-white font-light leading-[1.05]">
                      Book <br />
                      <span className="italic font-normal capitalize text-amber-100/90">Anywhere</span>
                    </h2>
                  </div>

                  {/* 3 Core Pillars */}
                  <div className="pillars-grid grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    <div className="pillar-item space-y-1 border-l border-white/20 pl-4 sm:border-l-0 sm:pl-0">
                      <h4 className="text-base font-medium text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Instant
                      </h4>
                      <p className="text-xs text-[#c5bfb4] font-light">
                        Book in seconds with instant confirmation.
                      </p>
                    </div>
                    <div className="pillar-item space-y-1 border-l border-white/20 pl-4 sm:border-l-0 sm:pl-0">
                      <h4 className="text-base font-medium text-white flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#d4af37]" /> Manage
                      </h4>
                      <p className="text-xs text-[#c5bfb4] font-light">
                        Trips, changes, and itineraries in one place.
                      </p>
                    </div>
                    <div className="pillar-item space-y-1 border-l border-white/20 pl-4 sm:border-l-0 sm:pl-0">
                      <h4 className="text-base font-medium text-white flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-[#d4af37]" /> Exclusive
                      </h4>
                      <p className="text-xs text-[#c5bfb4] font-light">
                        App only deals and concierge privileges.
                      </p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="pt-4">
                    <a
                      href="#download"
                      className="inline-flex items-center justify-center bg-white text-[#0a0a0c] px-8 py-3.5 text-xs font-semibold uppercase tracking-editorial hover:bg-[#f6f3ed] transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Download App
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. GET IN TOUCH DIVIDER */}
        {/* ======================================================== */}
        <section
          ref={touchSectionRef}
          id="contact"
          className="py-16 text-center border-t border-white/5 relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-block relative">
              {/* Expanding animated left line */}
              <div
                ref={lineLeftRef}
                className="w-16 h-px bg-white/25 absolute -left-20 top-1/2"
              />
              <h2 className="touch-heading font-editorial text-4xl sm:text-5xl uppercase tracking-wider text-white font-light">
                Get In Touch
              </h2>
              {/* Expanding animated right line */}
              <div
                ref={lineRightRef}
                className="w-16 h-px bg-white/25 absolute -right-20 top-1/2"
              />
            </div>
            <p className="touch-sub text-xs text-[#c5bfb4] uppercase tracking-luxury mt-3">
              Concierge & Support available 24/7 globally
            </p>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* 6. SITE FOOTER */}
      {/* ======================================================== */}
      <footer
        ref={footerRef}
        className="bg-[#0a0a0c] border-t border-white/10 pt-16 pb-12 relative overflow-hidden"
      >
        {/* Architectural watermark illustration in background */}
        <div className="footer-skyline absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.04] select-none flex justify-center overflow-hidden">
          <svg
            className="w-full text-white"
            fill="none"
            height="300"
            viewBox="0 0 1200 300"
            width="1200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 300V220H60V180H90V130H120V90H140V50H160V90H180V130H210V180H240V220H300V300H0Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M300 300V190H340V140H380V80H410V30H430V80H460V140H500V190H540V300H300Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M540 300V240H600V190H630V150H660V110H680V150H710V190H740V240H800V300H540Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M800 300V200H840V160H880V100H910V40H930V100H960V160H1000V200H1040V300H800Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M1040 300V230H1080V170H1120V120H1150V70H1170V120H1200V300H1040Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Footer Columns Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 pb-16">
            {/* Column 1: Explore */}
            <div className="footer-column space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h4>
              <ul className="space-y-2.5 text-xs text-[#c5bfb4] font-light">
                <li>
                  <a href="#stays" className="hover-luxury-link hover:text-white transition-colors">
                    Hotels
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover-luxury-link hover:text-white transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#deals" className="hover-luxury-link hover:text-white transition-colors">
                    Deals
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover-luxury-link hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#guides" className="hover-luxury-link hover:text-white transition-colors">
                    Travel Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="footer-column space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5 text-xs text-[#c5bfb4] font-light">
                <li>
                  <a href="#about" className="hover-luxury-link hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover-luxury-link hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#press" className="hover-luxury-link hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#sustainability" className="hover-luxury-link hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#investors" className="hover-luxury-link hover:text-white transition-colors">
                    Investor Relations
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="footer-column space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h4>
              <ul className="space-y-2.5 text-xs text-[#c5bfb4] font-light">
                <li>
                  <a href="#help" className="hover-luxury-link hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover-luxury-link hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#cancellation" className="hover-luxury-link hover:text-white transition-colors">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#support" className="hover-luxury-link hover:text-white transition-colors">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#payment" className="hover-luxury-link hover:text-white transition-colors">
                    Payment Options
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Media */}
            <div className="footer-column space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Social Media
              </h4>
              <ul className="space-y-2.5 text-xs text-[#c5bfb4] font-light">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <svg className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <svg className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <svg className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X (Twitter)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Copyright & Brand Identity */}
          <div className="pt-10 border-t border-white/5 flex flex-col items-center justify-center space-y-3">
            <a
              href="#home"
              className="font-editorial text-2xl tracking-[0.28em] font-normal uppercase text-white hover:text-[#c5bfb4] transition-colors"
            >
              STAY ROUTE
            </a>
            <p className="text-[11px] text-[#c5bfb4]/60 tracking-wider">
              © 2026 Stay Route Luxury Discovery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
