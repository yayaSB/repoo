export default function HeroSection() {
  return (
    <section className="mt-12 md:mt-20 text-center px-4 w-full max-w-[1440px] mx-auto">
      {/* Badge */}
      <div className="inline-block mb-6"></div>

      {/* Titre */}
      <h1 className="text-text-display-3 md:text-display-1  font-semibold max-w-4xl mx-auto leading-tight">
        <span className="text-sky-950">
          Boostez la Performance IT de <br className="hidden sm:block" />
          Votre Entreprise{" "}
        </span>
        <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          En un Instant
        </span>
      </h1>

      {/* Description */}
      <p className="text-sky-800 text-body-2 sm:text-body-1 md:text-title mt-5 max-w-2xl mx-auto">
        Obtenez un diagnostic instantané et des recommandations <br /> pour optimiser
        votre infrastructure IT.
      </p>

      {/* Bouton */}
      <div className="flex justify-center mt-8 mb-24">
        <a
          href="choose-user"
          className="bg-blue-500 text-white text-body-2 sm:text-body-1 md:text-title
            w-full sm:w-[220px] md:w-[245px] h-[48px] sm:h-[52px] md:h-[56px]
            px-6 py-3 transition-colors rounded-lg text-center flex items-center shadow-[0px_3px_12px_rgba(0,0,0,0.1)] justify-center"
        >
          Démarrer l'évaluation
        </a>
      </div>
    </section>
  );
}