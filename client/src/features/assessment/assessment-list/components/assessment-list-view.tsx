"use client";
import Header from "@/components/header";
import { Calendar } from "lucide-react";
import AssessmentTable from "./table-assessment";

interface DashboardViewProps {
  role: "creator" | "evaluator";
}

export default function TableListView({ role }: DashboardViewProps) {
  const date = new Date();
  const jour = date
    .toLocaleDateString("fr-FR", { weekday: "short" })
    .replace(".", "")
    .replace(/^\w/, (c) => c.toUpperCase());
  const mois = date.toLocaleDateString("en-US", { month: "short" });
  const jourNum = date.getDate();
  const annee = date.getFullYear();
  const today = `${jour}, ${mois} ${jourNum}, ${annee}`;

  const Title = 
    role === "evaluator"
      ? "Historique et progression des évaluations"
      : "IT Performance analysis & insights";

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
              {Title}
            </h1>
          </div>
        </div>

        <AssessmentTable role={role} />
      </main>
    </div>
  );
}
