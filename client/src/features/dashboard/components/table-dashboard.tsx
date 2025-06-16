"use client";

import { TableComponent, TableColumn } from "@/components/table-components";
import { mockEvaluations } from "@/constants/mock-assessment";
import { useState, useEffect } from "react";
import InviteModal from "@/components/modal/invite-modal";
import { z } from "zod";

interface Props {
  role: "creator" | "evaluator";
}

export default function TableDashboard({ role }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const formSchema = z.object({
    email: z.string().email("Email invalide"),
    role: z.string().min(1, "Rôle requis"),
  });

  const formFields = [
    {
      name: "role",
      label: "Rôle à attribuer",
      type: "select" as const,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Utilisateur", value: "user" },
      ],
      placeholder: "Choisir un rôle",
      labelClassName: "text-body",
      inputClassName:
        "text-sky-800 data-[placeholder=false]:text-black h-[56px] border border-sky-500",
    },
    {
      name: "email",
      label: "À",
      type: "email" as const,
      placeholder: "exemple@domaine.com",
      labelClassName: "text-body",
      inputClassName: "placeholder:text-sky-800 h-[56px] border border-sky-500",
    },
  ];

  const creatorColumns: TableColumn<any>[] = [
    { key: "checked", label: "" },
    { key: "name", label: "Nom de l'évaluation" },
    { key: "evaluator", label: "Évaluateur" },
    { key: "date", label: "Date" },
    { key: "score", label: "Score" },
    { key: "status", label: "Status" },
    { key: "evolution", label: "Évolution" },
    { key: "actions", label: "Actions" },
  ];

  const evaluatorColumns: TableColumn<any>[] = [
     { key: "checked", label: "" },
    { key: "name", label: "Nom de l’évaluation" },
    { key: "date", label: "Date" },
    { key: "score", label: "Score obtenu" },
    { key: "evolution", label: "Évolution" },
    { key: "status", label: "Statut" },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    const formattedData = mockEvaluations.map((item) => {
      const commonFields = {
        name: item.name,
        date: item.date,
        score: item.score,
        evolution: item.evolution,
        status: item.status,
      };

      if (role === "creator") {
        return {
          ...commonFields,
          checked: false,
          evaluator: item.evaluator,
          actions: [
            {
              label: "Consulter",
              icon: "Eye",
              className: "text-sky-900 border border-[#ADAEAF]",
              onClick: () => alert(`Consulter ${item.name}`),
            },
            {
              label: "Exporter",
              icon: "FileDown",
              className: "bg-blue-500 text-white",
              onClick: () => {
                setSelectedRow(item);
                setOpenModal(true);
              },
            },
          ],
        menuActions: [
        {
        label: "Editer",
        onClick: () => alert(`Editer ${item.name}`),
        },
        {
        label: "Dupliquer",
        onClick: () => alert(`Dupliquer ${item.name}`),
        },
        {
        label: "Supprimer",
        onClick: () => alert(`Supprimer ${item.name}`),
        },]
          
        };
      } else {
        return {
          ...commonFields,
          actions: [
            {
              label: "Consulter",
              icon: "Eye",
              className: "text-sky-900 border border-[#ADAEAF]",
              onClick: () => alert(`Consulter ${item.name}`),
            },
          ],
        };
      }
    });

    setData(formattedData);
  }, [role]);

  return (
    <div className="py-3">
      {openModal && role === "creator" && (
        <InviteModal
          title="Inviter un membre à la plateforme"
          description="Envoyez une invitation par email ou lien."
          linkValue={`https://diagnosis.com/invite/${selectedRow?.id ?? "ABC123"}`}
          formSchema={formSchema}
          formFields={formFields}
          onClose={() => setOpenModal(false)}
          onInvite={(values) => {
            console.log("✅ Données soumises :", values);
            setOpenModal(false);
          }}
          onAddEditor={() => console.log("Ajout d’éditeur")}
        />
      )}

      {data.length > 0 ? (
        <TableComponent columns={role === "creator" ? creatorColumns : evaluatorColumns} data={data} />
      ) : (
        <div className="text-center text-gray-500">Chargement des évaluations...</div>
      )}
    </div>
  );
}