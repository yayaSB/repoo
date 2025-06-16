"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";

export default function InstructionsSection() {
  const router = useRouter();
  const params = useParams();

  const handleContinue = () => {
    router.push(`/evaluator/assessment/${params.id}/identification`);
  };

  return (
    <div className="w-full lg:w-1/2 flex-grow md:basis-2/3 px-6 pt-20 pb-10 sm:pt-24 md:px-10 lg:px-16 flex flex-col justify-center">
      <div className="w-full md:mx-0">
        <h3 className="text-[#1c5df3] text-2xl sm:text-3xl font-semibold mb-4">
          Instructions
        </h3>
        <p className="text-[#4C4D4D] text-base sm:text-lg mb-6">
          Avant de commencer l'évaluation de maturité IT, veuillez fournir vos
          informations pour accéder aux résultats de l'évaluation.
        </p>

        <ol className="list-decimal list-inside space-y-6 mb-8 text-base sm:text-lg text-[#4C4D4D] ml-6">
          <li>
            Entrez votre nom complet – Il sera utilisé pour personnaliser votre
            rapport.
          </li>
          <li>
            Fournissez votre adresse e-mail – Un résumé de votre évaluation et
            des insights pourront être envoyés à cet e-mail.
          </li>
          <li>
            Cliquez sur "Commencer l'évaluation" – Accédez à l'évaluation une
            fois vos informations saisies.
          </li>
        </ol>

        <div className="bg-[#e8effe] p-4 rounded-lg mb-8">
          <p className="text-[#0b2561] text-sm sm:text-base flex items-start">
            <span className="mr-2">📌</span>
            <span>
              Note : Vos informations seront utilisées uniquement à des fins
              d'évaluation et ne seront pas partagées.
            </span>
          </p>
        </div>

        <div className="w-full">
          <Button
            onClick={handleContinue}
            className="shadow-[0_3px_12px_0_#0000001A] bg-[#1c5df3] hover:bg-[#0b2561] text-white px-8 py-5 rounded-lg w-full max-w-[300px] flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
