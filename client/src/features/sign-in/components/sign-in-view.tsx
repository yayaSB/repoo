"use client";

import SocialSignInButton from "./social-sign-in-button";
import Divider from "./divider";
import SignInForm from "./sign-in-form";
import IllustrationPanel from "./illustration-panel";
import Header from "@/components/header";

type SignInViewProps = {
  role: "creator" | "evaluator";
};

export default function SignInView({ role }: SignInViewProps) {
  const isEvaluator = role === "evaluator";

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col bg-white ${
        isEvaluator ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Top Header */}
      <div className="w-full absolute top-0 left-0 z-10">
        <Header
          position="static"
          background="transparent"
          withMenu={false}
          withLinks={false}
          showLogoLink={true}
          withLanguage={true}
        />
      </div>

      <div className="w-full lg:w-[60%] px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-center h-screen">
        <div className="w-full max-w-[508px] mx-auto space-y-8">
          <div className="text-center">
            <div className="text-[#1C5DF3] font-bold text-sm sm:text-base md:text-lg lg:text-xl">
              {isEvaluator ? "Évaluateur" : "Créateur"}
            </div>
            <h1 className="text-2xl text-[#282829] sm:text-3xl md:text-[39px] font-bold mt-2">
              Connexion {isEvaluator ? "évaluateur" : "créateur"}
            </h1>
          </div>

          <div className="w-full">
            <SocialSignInButton />
          </div>

          <Divider />

          <SignInForm role={role}/>
        </div>
      </div>

      {/* Right - Illustration */}
      <IllustrationPanel role={role} />
    </div>
  );
}
