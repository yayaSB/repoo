import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import TableDashboard from "./table-dashboard"
import Chart from "./chart"
import MetricCardDashboard from "./metric-card-dashboard"
import Header from "@/components/header"

interface DashboardViewProps {
  role: "creator" | "evaluator";
}

export default function DashboardView({ role }: DashboardViewProps) {
  const date = new Date();
  const jour = date
    .toLocaleDateString("fr-FR", { weekday: "short" })
    .replace(".", "")
    .replace(/^\w/, (c) => c.toUpperCase());
  const mois = date.toLocaleDateString("en-US", { month: "short" });
  const jourNum = date.getDate();
  const annee = date.getFullYear();
  const today = `${jour}, ${mois} ${jourNum}, ${annee}`;

  return (
    <div className="max-h-screen bg-[#F7F9FA] overflow-y-auto">
      <Header
        withMenu={true}
        withLinks={false}
        showLogoLink={true}
        showProfile={true}
        role={role}
      />
      <main className="container py-6 mt-22">
        <div className="mb-2 flex items-center">
          <div>
            <div className="flex items-center gap-1 text-sky-700 text-title mb-0">
              <Calendar className="h-4 w-4" />
              <span>{today}</span>
            </div>
            <h1 className="text-display-3 font-bold text-sky-950">
              Aperçu des performances IT
            </h1>
          </div>
          <div className="ml-auto">
            <Button className="h-[48px] bg-blue-500 text-xl text-white">
              <span className="mr-2">+</span>
              Nouveau évaluation
            </Button>
          </div>
        </div>
        <MetricCardDashboard role={role} />
        <Chart />
        <TableDashboard role={role} />
      </main>
    </div>
  );
}
