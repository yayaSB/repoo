"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { TableComponent, TableColumn } from "@/components/table-components";
import { assessmentHistoryData } from "@/constants/assessment-detail";

type AssessmentHistoryItem = {
  checked: boolean;
  evaluator: string;
  date: string;
  score: number;
  status: string;
  duration: string;
  actions: {
    label: string;
    icon: string;
    className: string;
    onClick: () => void;
  }[];
};

const columns: TableColumn<AssessmentHistoryItem>[] = [
  {
    key: "checked",
    label: "",
  },
  { key: "evaluator", label: "Évaluateur" },
  { key: "date", label: "Date" },
  {
    key: "score",
    label: "Score obtenu",
  },
  { key: "status", label: "Statut" },
  { key: "duration", label: "Temps passé" },
  { key: "actions", label: "Actions" },
];

export function AssessmentDetailView({
  assessmentId,
}: {
  assessmentId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<AssessmentHistoryItem[]>([]);
  const [assessmentName, setAssessmentName] = useState<string>("");

  useEffect(() => {
    const filteredRaw = assessmentHistoryData.filter(
      (item) => item.assessmentId === assessmentId
    );

    setAssessmentName(
      filteredRaw[0]?.assessmentName || "Détail de l’évaluation"
    );

    setData(
      filteredRaw.map((item) => ({
        checked: false,
        evaluator: item.evaluator,
        date: item.date,
        duration: item.duration,
        score: item.score,
        status: item.status,
        actions: [
          {
            label: "Consulter",
            icon: "Eye",
            className:
              "text-[#4C4D4D] border border-[#ADAEAF] px-3 py-1 rounded-lg cursor-pointer",
            onClick: () => alert(`Consulter ${item.evaluator}`),
          },
          {
            label: "Exporter",
            icon: "FileDown",
            className: "bg-[#1c5df3] text-white",
            onClick: () => alert(`Exporter ${item.evaluator}`),
          },
        ],
      }))
    );
  }, [assessmentId]);


  return (
    <div className="h-screen">
      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1
            onClick={() => router.push("/assessments")}
            className="flex items-center cursor-pointer select-none font-medium text-[24px] leading-[23px] relative"
          >
            <img
              src="/icons/arrow.svg"
              alt="Retour"
              className="w-6 h-4 mr-3"
              aria-hidden="true"
              draggable={false}
            />
            {assessmentName}
          </h1>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-800 text-white px-5 py-2 rounded-lg flex items-center justify-center text-[16px] shadow-md"
            onClick={() => alert("Inviter un évaluateur")}
          >
            <span className="mr-1.5 leading-none">+</span>
            Inviter un évaluateur
          </button>
        </div>

        {/* Table */}
        <TableComponent
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
