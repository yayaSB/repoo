"use client";

import { TableComponent, TableColumn } from "@/components/table-components";
import { getAssessments, Assessment } from "@/constants/assessment-dashboard";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button"

const columns: TableColumn<any>[] = [
  { key: "checked", label: "" },
  { key: "name", label: "Nom de l'évaluation" },
  { key: "evaluator", label: "Évaluateur" },
  { key: "date", label: "Date" },
  { key: "score", label: "Score" },
  { key: "status", label: "Statut" },
  { key: "evolution", label: "Évolution" },
  { key: "actions", label: "Actions" },
];

export default function AssessmentTableList() {
  const [data, setData] = useState<any[]>([]);
  const [date] = useState(new Date());

  const jour = date
    .toLocaleDateString("fr-FR", { weekday: "short" })
    .replace(".", "")
    .replace(/^\w/, (c) => c.toUpperCase());
  const mois = date.toLocaleDateString("en-US", { month: "short" });
  const jourNum = date.getDate();
  const annee = date.getFullYear();
  const today = `${jour}, ${mois} ${jourNum}, ${annee}`;

  useEffect(() => {
    const assessments = getAssessments().slice(0, 5);

    const formattedData = assessments.map((item: Assessment) => ({
      ...item,
      checked: false,
      evolution: `${item.score}`,
      actions: [
        {
          label: "Voir les détails",
          className: "text-[#4C4D4D] border border-[#ADAEAF]",
          onClick: () => alert(`Voir les détails ${item.name}`),
        },
      ],
    }));

    setData(formattedData);
  }, []);

  return (
    <div className="max-h-screen bg-[#F7F9FA] overflow-y-auto">
      <main className="container py-6 mt-22">
      <div className="mb-2 flex items-center">
        <div>
          <div className="flex items-center gap-1 text-sky-700 text-title mb-0">
            <Calendar className="h-4 w-4" />
            <span>{today}</span>
          </div>
          <h1 className="text-display-3 font-bold text-sky-950">
            IT Performance analysis & insights
          </h1>
        </div>
        <div className="ml-auto">
          <Button className="h-[48px] bg-blue-500 text-xl text-white">
            <span className="mr-2">+</span>
            Nouveau évaluation
          </Button>
        </div>    
      </div>
      
        {data.length > 0 ? (
          <TableComponent columns={columns} data={data} />
        ) : (
          <div className="text-center text-gray-500">
            Chargement des évaluations...
          </div>
        )}
      </main>
    </div>
  );
}
