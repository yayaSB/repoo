"use client";

import { useEffect, useState } from "react";
import { TableComponent, TableColumn } from "@/components/table-components";
import { getAssessments } from "@/constants/assessment-dashboard";
import { mockEvaluationsList } from "@/constants/mock-evaluator-list";

interface AssessmentTableProps {
  role: "creator" | "evaluator";
}

export default function AssessmentTable({ role }: AssessmentTableProps) {
  const [data, setData] = useState<any[]>([]);
  const columns: TableColumn<any>[] = [
    { key: "checked", label: "" },
    { key: "name", label: "Nom de l'évaluation" },
    ...(role === "creator" ? [{ key: "evaluator", label: "Évaluateur" }] : []),
    { key: "date", label: "Date" },
    { key: "score", label: "Score" },
     ...(role === "evaluator" ? [{ key: "evolution", label: "Évolution" }] : []),
    { key: "status", label: "Statut" },
    { key: "actions", label: "Actions" },
  ];

  const evaluatorActions =
    role === "evaluator"
      ? {
          onStart: (row: any) => alert(`Commencer ${row.name}`),
          onContinue: (row: any) => alert(`Continuer ${row.name}`),
          onView: (row: any) => alert(`Consulter ${row.name}`),
        }
      : undefined;

    const Title = 
    role === "evaluator"
      ? "" 
      : "Tableau de suivi des évaluations" ;  

  const extraActions = (item: any) =>
    role === "evaluator"
      ? [
          {
            label: "Consulter",
            icon: "Eye",
            className: "text-sky-900 border border-[#ADAEAF]",
            onClick: () => alert(`Consulter ${item.name}`),
          },
          {
            label: "Modifier",
            icon: "Edit",
            className: "text-sky-900 border border-[#ADAEAF]",
            onClick: () => alert(`Modifier ${item.name}`),
          },
        ]
      : [
          {
            label: "Voir les détails",
            className: "text-[#4C4D4D] border border-[#ADAEAF]",
            onClick: () => alert(`Voir les détails ${item.name}`),
          },
        ];

    const prepareData = () => {
    const source = role === "evaluator" ? mockEvaluationsList : getAssessments().slice(0, 5);
    return source.map((item) => ({
      ...item,
      checked: false,
      actions: extraActions(item),
    }));
    };

    useEffect(() => {
    setData(prepareData());
     }, [role]);

  return (
    <TableComponent
      columns={columns}
      data={data}
      role={role}
      evaluatorActions={evaluatorActions}
      title={Title}
    />
  );
}
