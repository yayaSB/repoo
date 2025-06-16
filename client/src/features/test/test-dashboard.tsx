import { MetricCard } from "@/components/metric-card";
import { RefreshCw, Users } from "lucide-react";

export default function Dashboard() {
  return (
    
      <main className="py-1">
        <MetricCard.Group>
          <MetricCard
            title="Évaluations créées"
            value={187}
            description="Total des évaluations lancées depuis votre espace créateur"
            icon={<img src="/icons/File.svg" alt="Récompense" className="h-[24px] w-[24px]" />}
            iconBg="bg-[#f2f0ff]"
          />
          <MetricCard
            title="Suivi des évaluations"
            value={[
              { value: 87, label: "En cours" },
              { value: 100, label: "Terminées" }
            ]}
            icon={<RefreshCw className="h-5 w-5 text-[#1c5df3]" />}
            iconBg="bg-[#e8effe]"
          />
          <MetricCard
            title="Meilleur score"
            value={87}
            suffix="%"
            description="Score le plus élevé obtenu"
            icon={<img src="/icons/award.svg" alt="Récompense" className="h-[24px] w-[24px]" />}
            iconBg="bg-[#e7faf1]"
          />
          <MetricCard
            title="Évaluateurs actifs"
            value={5}
            description="Utilisateurs actifs ce mois-ci"
            icon={<Users className="h-5 w-5 text-[#ff7b1d]" />}
            iconBg="bg-[#fff2e8]"
          />
           
        </MetricCard.Group>
      </main>
   
  );
}
