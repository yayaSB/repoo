"use client";

import Image from "next/image";

type IllustrationPanelProps = {
  role: "creator" | "evaluator";
};

export default function IllustrationPanel({ role }: IllustrationPanelProps) {
  const imageSrc =
    role === "creator"
      ? "/images/creator-login-Illustration.png"
      : "/images/evaluator-login-Illustration.png";

  return (
    <div className="w-full lg:w-[40%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen relative">
      <Image
        src={imageSrc}
        alt={`Illustration ${role}`}
        fill
        className="object-cover object-[center_60%]"
        priority
      />
    </div>
  );
}

