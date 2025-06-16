import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from '@/features/sign-up/components/logo';
import Language from "@/components/language-selector";
import Header from "@/components/header";

export default function ChooseUserView() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#ACAAFB]/60 to-white font-[Rethink Sans]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Header 
          position="fixed"
          background="transparent"
          withMenu={true}
          withLinks={false}
          withLanguage={true}
          showLogoLink={true}
        />

        {/* Main content */}
        <main>
          <div className="hidden md:grid grid-cols-[1fr_1px_1fr] gap-x-12 h-[calc(100vh-100px)] items-center justify-center tracking-wide">
            
            {/* Left column - Creator */}
            <div className="relative flex flex-col items-center justify-center py-12 text-center">
              <span className="mb-4 text-[16px] font-bold text-[#1C5DF3]">créateur</span>
              <h2 className="mb-4 text-[48px] font-bold text-gray-900 leading-tight">
                Créez et gérez
                <br />
                vos évaluations
              </h2>
              <p className="mb-20 text-[#737475] text-[20px] text-center leading-relaxed">
                Définissez la portée, configurez les critères
                <br />
                et suivez les résultats en toute simplicité.
              </p>
              <Link
                href="creator/sign-up"
                className="flex items-center justify-center gap-2 rounded-md mx-auto w-[427px] h-[58px] bg-[#1C5DF3] px-6 text-white transition-colors hover:bg-[#4D8AFF] text-[20px] font-semibold shadow-[0px_3px_12px_rgba(0,0,0,0.1)] "
              >
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-6 text-[20px] text-gray-600">
                Déjà inscrit ?{" "}
                <Link href="creator/sign-in" className="text-[#1C5DF3] hover:underline">
                  Accéder ici
                </Link>
              </div>
            </div>

            {/* Center vertical divider */}
            <div className="h-[80%] bg-[#C6C7C8] w-px mx-auto" />

            {/* Right column - Evaluator */}
            <div className="relative flex flex-col items-center justify-center py-12 text-center">
              <span className="mb-4 text-[16px] font-bold text-[#1C5DF3]">évaluateur</span>
              <h2 className="mb-4 text-[48px] font-bold text-gray-900 leading-tight">
                Évaluez avec
                <br />
                précision et impact
              </h2>
              <p className="mb-20 text-[#737475] text-[20px] text-center leading-relaxed">
                Analysez, donnez votre avis et contribuez
                <br />
                à l'amélioration des processus.
              </p>
              <Link
                href="evaluator/sign-up"
                className="flex items-center justify-center gap-2 rounded-md mx-auto w-[427px] h-[58px] border-[2.5px] border-[#1C5DF3] bg-transparent px-6 text-[#1C5DF3] transition-colors hover:bg-gray-50 text-[20px] font-semibold shadow-[0px_3px_12px_rgba(0,0,0,0.1)]"
              >
                Évaluer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-6 text-[20px] text-gray-600">
                Déjà inscrit ?{" "}
                <Link href="evaluator/sign-in" className="text-[#1C5DF3] hover:underline">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}