import Image from "next/image";

export default function BorderedCardImage() {
  return (
    <div className="w-full flex justify-center mt-5 relative z-20">
      <div className="shadow-lg relative" style={{ width: "1023px" }}>
        <Image
          src="/images/application-image.png"
          alt="Description de l'image"
          width={1023}
          height={0}
          className="w-full h-auto object-contain rounded-2xl relative z-10"
        />

        {/* Stroke simulé autour de l'image */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            boxShadow: "0 0 0 18px rgba(255,255,255,0.48)",
          }}
        />
      </div>
    </div>
  );
}
