"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import HeroSection from "./hero-section";
import BorderedCardImage from "./border-card-image";
import BackgroundImage from "./background-image";

export default function LandingViewPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = pageRef.current;
    if (!element) return;

    const handleScroll = () => {
      setIsScrolled(element.scrollTop > 10);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header
        position="fixed"
        background="transparent"
        withMenu={true}
        withLinks={true}
        showLogoLink={false}
        withLanguage={true}
      />
      <div
        ref={pageRef}
        className="landing-page relative bg-gradient-to-t from-[#acaafb]/60 to-white min-h-screen"
      >
        <main className="main-content flex flex-col items-center justify-center relative z-10 px-4 sm:px-8 w-full max-w-[1440px] mx-auto">
          <HeroSection />
          <BorderedCardImage />
        </main>
        <BackgroundImage />
      </div>
    </>
  );
}
