"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { TableComponent, TableColumn } from "@/components/table-components";
import { mockEvaluators } from "@/constants/evaluator-list";

const formattedDate = (() => {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const parts = formatter.formatToParts(today);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";

  return `${capitalize(weekday)}, ${day} ${capitalize(month.replace(".", ""))} ${year}`;
})();

const formattedData = mockEvaluators.map((evaluator) => ({
  ...evaluator,
  checked: false,
  assigned: `${evaluator.assigned} évaluation${evaluator.assigned > 1 ? "s" : ""}`,
  completed: `${evaluator.completed}`,
  scoreText: `${evaluator.score}%`,
  actions: [
    {
      label: "",
      icon: "SquarePen",
      className:
        "flex items-center justify-center p-1 border border-[var(--Neutral-600,#ADAEAF)] rounded text-sm hover:bg-gray-100 w-[32px] h-[32px]",
      onClick: () => alert(`Voir les détails de ${evaluator.email}`),
    },
  ],
  menuActions: [
    { label: "Editer", onClick: () => alert(`Editer ${evaluator.name}`) },
    { label: "Dupliquer", onClick: () => alert(`Dupliquer ${evaluator.name}`) },
    { label: "Supprimer", onClick: () => alert(`Supprimer ${evaluator.name}`) },
  ],
}));

const columns: TableColumn<any>[] = [
  { key: "checked", label: "" },
  { key: "name", label: "Nom de l’évaluateur" },
  { key: "email", label: "Email" },
  { key: "assigned", label: "Évals assignées" },
  { key: "completed", label: "Évals complétées" },
  { key: "lastActivity", label: "Dernière activité" },
  { key: "scoreText", label: "Score moy." },
  { key: "statut", label: "Statut" },
  { key: "actions", label: "Actions" },
];

export default function EvaluatorTable() {
  return (
    <div className="min-h-screen p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} color="#9D9E9F" />
        <span className="text-sm text-[#9D9E9F]">{formattedDate}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[25px] text-[#282829] font-semibold">Gestion des évaluateurs</h2>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-800 text-white px-5 py-2 rounded-lg flex items-center justify-center text-[16px] shadow-md"
          onClick={() => alert("Inviter un évaluateur")}
        >
          <span className="mr-1.5 leading-none">+</span>
          Nouvel évaluateur
        </button>
      </div>

      {formattedData.length > 0 ? (
        <TableComponent
          columns={columns}
          data={formattedData}
          title="Tableau de suivi des évaluations"
        />
      ) : (
        <div className="text-center text-gray-500">Chargement des évaluateurs...</div>
      )}
    </div>
  );
}
