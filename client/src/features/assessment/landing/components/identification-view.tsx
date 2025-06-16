"use client";

import Header from "@/components/header";
import AssessmentIntro from "./assessment-intro";
import IdentificationForm from "./identification-form";
import { useParams } from "next/navigation";
import { assessmentsData } from "@/constants/data-assessment";

export default function IdentificationView() {
  const { id } = useParams();
  const assessment = assessmentsData.find((a) => a.id === id);

  if (!assessment)
    return <div className="p-10 text-red-500">Évaluation introuvable</div>;

  return (
    <div className="flex flex-col min-h-screen h-screen overflow-y-auto">
      <Header
        position="fixed"
        background="transparent"
        withMenu={false}
        withLinks={false}
        withLanguage={true}
        showLogoLink={true}
      />
      <main className="flex-1 flex flex-col md:flex-row">
        <AssessmentIntro assessment={assessment} />
        <IdentificationForm />
      </main>
    </div>
  );
}
