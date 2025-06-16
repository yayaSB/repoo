import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="absolute bottom-0 inset-x-0 w-full z-0 pointer-events-none translate-y-6 sm:translate-y-10 md:translate-y-0 lg:translate-y-0">
      <div className="w-full mx-auto px-4">
        <Image
          src="/images/landing-illustration.png"
          alt="IT analysis illustration"
          width={1600}
          height={0}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
