"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Language from "@/components/language-selector";
import { usePathname, useRouter } from "next/navigation";
import ProfileModal from "@/components/modal/profil-modal";

interface Tab {
  key: string;
  label: string;
  path: string;
}

interface HeaderProps {
  withMenu?: boolean;
  withLinks?: boolean;
  showProfile?: boolean;
  tabs?: Tab[];
  position?: "fixed" | "static";
  showLogoLink?: boolean;
  background?: "white" | "transparent";
  profileImageSrc?: string;
  withLanguage?: boolean;
  activeTab?: string;
  role?: "creator" | "evaluator";
}

export default function Header({
  withMenu = false,
  withLinks = false,
  withLanguage = false,
  showProfile = false,
  position = "fixed",
  showLogoLink = true,
  background = "white",
  profileImageSrc = "/icons/profile.svg",
  role ,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter();
  let timeoutId: NodeJS.Timeout | null = null

  const creatorTabs = [
    { key: "dashboard", label: "Dashboard", path: "/creator/dashboard" },
    { key: "creator-assessments", label: "Les évaluations", path: "/creator/assessments" },
    { key: "evaluators-list", label: "Gérer les évaluateurs", path: "/creator/evaluation" },
  ];

  const evaluatorTabs = [
    { key: "dashboard", label: "Dashboard", path: "/evaluator/dashboard" },
    { key: "evaluator-assessments", label: "Mes évaluations", path: "/evaluator/assessment/List" },
    { key: "evaluation-help", label: "Aide à l'évaluation", path: "/evaluator/evaluation" },
  ];

   const tabs = role === "creator" ? creatorTabs : role === "evaluator" ? evaluatorTabs : [];

  const bgClass =
    background === "white"
      ? "bg-white"
      : background === "transparent"
      ? "bg-transparent"
      : "bg-white/80 backdrop-blur-md shadow-md";

  const positionClass = position === "fixed" ? "fixed top-0 left-0 z-50" : "";
  const layoutClass = "container flex justify-between items-center px-4 md:px-8 py-4";

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <header className={`w-full ${positionClass} ${bgClass} transition-all duration-500`}>
      <div className={layoutClass}>
        {/* Logo */}
        <div>
          {showLogoLink ? (
            <Link href="/">
              <Image
                src="/logo/logo.svg"
                alt="Logo"
                width={124}
                height={31}
                className="object-contain"
                priority
              />
            </Link>
          ) : (
            <Image
              src="/logo/logo.svg"
              alt="Logo"
              width={124}
              height={31}
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Tabs navigation */}
        {tabs.length > 0 && (
          <nav className="hidden md:flex space-x-6 cursor-pointer">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`px-3 py-1 cursor-pointer relative font-medium text-sm ${
                  isActive(tab.path) ? "text-[#1C5DF3]" : "text-gray-600"
                }`}
                onClick={() => handleNavigate(tab.path)}
              >
                {tab.label}
                {isActive(tab.path) && (
                  <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 w-[60%] border-b-3 border-solid border-[#1C5DF3]" />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Right side - login/signup & language or profile */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-2">
            {withLinks && (
              <>
                <Link
                  href="/choose-user"
                  className="text-[#1C5DF3] text-[16px] text-sm px-3 py-1 rounded-md"
                >
                  Connexion
                </Link>
                <Link
                  href="/choose-user"
                  className="border border-[#1C5DF3] text-[#1C5DF3] w-[171px] text-[16px] px-4 py-2 rounded-md cursor-pointer border-2 h-[48px] flex items-center justify-center"
                  style={{ boxShadow: "0px 3px 12px 0px #0000001A" }}
                >
                  Create account
                </Link>
              </>
            )}
            {withLanguage && <Language />}
          </nav>

          {showProfile && (
            <div className="relative"
              onMouseEnter={() => {
                if (timeoutId) clearTimeout(timeoutId)
                setIsProfileOpen(true)
              }}
              onMouseLeave={() => {
                timeoutId = setTimeout(() => setIsProfileOpen(false), 150)
              }}
            >
              {/* Avatar */}
              <div className="flex items-center cursor-pointer select-none">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  <Image
                    src={profileImageSrc}
                    alt="User profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <ChevronDown size={22} className="text-sky-900 ml-1" />
              </div>

              {/* Dropdown modal */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 z-50">
                  <ProfileModal isOpen={true} onClose={() => setIsProfileOpen(false)} />
                </div>
              )}
            </div>
          )}

          {withMenu && (
            <button
              className="md:hidden text-black"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {withMenu && isOpen && withLinks && !showProfile && (
        <div className="md:hidden w-full bg-white/80 backdrop-blur-md px-4 py-4 flex flex-col gap-3 border-t border-gray-200">
          <Link
            href="/choose-user"
            className="text-black text-sm px-3 py-2 rounded hover:bg-[#f0f4ff] transition"
            onClick={() => setIsOpen(false)}
          >
            Connexion
          </Link>
          <div className="h-px bg-gray-300 my-1" />
          <Link
            href="/choose-user"
            className="text-black text-sm px-3 py-2 rounded hover:bg-[#f0f4ff] transition"
            style={{ boxShadow: "0px 3px 12px 0px #0000001A" }}
            onClick={() => setIsOpen(false)}
          >
            Create account
          </Link>
        </div>
      )}
    </header>
  );
}
