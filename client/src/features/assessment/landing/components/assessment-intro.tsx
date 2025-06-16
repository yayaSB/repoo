import { Clock, FileText } from "lucide-react";
import { Assessment } from "@/constants/data-assessment";

type Props = {
  assessment: Assessment;
};

export default function AssessmentIntro({ assessment }: Props) {
  return (
    <div className="w-full lg:w-1/2 flex-grow md:basis-1/2 bg-gradient-to-b from-[#ffffff] via-[#E5E2FE] to-[#C9C6FD] px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-6 flex flex-col justify-center">
  <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-[#141528] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Bienvenue à votre {assessment.title}
        </h2>
        <p className="text-[#4c4d4d] text-base sm:text-lg md:text-xl mb-25">
          Prêt à libérer votre potentiel numérique ?
        </p>

        <div className="flex flex-wrap gap-4">
          <div
            className="flex items-center gap-2 rounded-lg border border-black 
                  px-2 py-1.5 text-[#141528] 
                  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 
                  lg:px-4 lg:py-2"
          >
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5" />
            <span>{assessment.duration} min</span>
          </div>

          <div
            className="flex items-center gap-2 rounded-lg border border-black 
                  px-2 py-1.5 text-[#141528] 
                  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 
                  lg:px-4 lg:py-2"
          >
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5" />
            <span>{assessment.questionsCount} questions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
