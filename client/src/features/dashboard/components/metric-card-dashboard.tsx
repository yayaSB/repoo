import { MetricCard } from "@/components/metric-card";
import { RefreshCw, Users } from "lucide-react";


interface Props {
  role: "creator" | "evaluator";
}

export default function MetricCardDashboard({ role }: Props) {
  return (
    <main className="py-1">
      <MetricCard.Group>
        {role === "creator" ? (
          <>
            <MetricCard
              title="Évaluations créées"
              value={187}
              description="Total des évaluations lancées depuis votre espace créateur"
              icon={<img src="/icons/File.svg" alt="Fichier" className="h-[24px] w-[24px]" />}
              iconBg="bg-[#f2f0ff]"
            />
            <MetricCard
              title="Suivi des évaluations"
              value={[
                { value: 87, label: "En cours" },
                { value: 100, label: "Terminées" }
              ]}
              icon={<RefreshCw className="h-5 w-5 text-blue-500" />}
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
          </>
        ) : (
          <>
            <MetricCard
              title="Score moyen"
              value={76}
              suffix="%"
              description="Votre score moyen sur les évaluations"
              icon={<img src="/icons/chart.svg" alt="Graphique" className="h-[24px] w-[24px]" />}
              iconBg="bg-[#f2f0ff]"
            />
            <MetricCard
              title="Évaluations terminées"
              value={7}
              description="Évaluations que vous avez finalisées"
              icon={<img src="/icons/square-checked.svg" alt="Graphique" className="h-[24px] w-[24px]" />}
              iconBg="bg-[#e7faf1]"
            />
            <MetricCard
              title="Évaluations en cours"
              value={3}
              description="Évaluations à compléter"
              icon={<RefreshCw className="h-5 w-5 text-blue-500" />}
              iconBg="bg-[#e8effe]"
            />
            <MetricCard
              title="Meilleur score"
              value={92}
              suffix="%"
              description="Votre meilleur score obtenu"
              icon={<img src="/icons/award-orange.svg" alt="Récompense" className="h-[24px] w-[24px]" />}
              iconBg="bg-[#FFF2E8]"
            />
          </>
        )}
      </MetricCard.Group>
    </main>
  );
}
