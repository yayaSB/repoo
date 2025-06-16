interface CategoryDescriptionProps {
  category: string;
}

export function CategoryDescription({ category }: CategoryDescriptionProps) {
  const getDescription = (category: string) => {
    switch (category) {
      case "Gouvernance IT":
        return "Évaluation des processus de décision et de la stratégie IT";
      case "Innovation":
        return "Évaluation de la capacité à intégrer de nouvelles technologies";
      case "Sécurité IT":
        return "Évaluation des mesures de sécurité et de protection des données";
      case "Infrastructure":
        return "Évaluation des infrastructures techniques et de leur gestion";
      case "Applications":
        return "Évaluation du portefeuille applicatif et de sa gestion";
      case "Données":
        return "Évaluation de la gestion et de l'exploitation des données";
      default:
        return `Évaluation de ${category}`;
    }
  };

  return (
    <div className="bg-[#E8EFFE] px-5 py-4 rounded-md max-w-5xl mx-auto">
      <h3 className="font-poppins font-semibold text-[#244DC6] text-[25px] mb-2">
        {category}
      </h3>
      <p className="font-poppins font-normal text-[#737475] text-[20px] leading-[120%] tracking-[0%]">
        {getDescription(category)}
      </p>
    </div>
  );
}
