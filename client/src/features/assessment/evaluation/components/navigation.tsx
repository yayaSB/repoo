"use client"

import { Button } from "@/components/ui/button"

interface NavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onContinue: () => void
  isLastStep: boolean
  reviewButtonText?: string
}

export function Navigation({
  currentStep,
  totalSteps,
  onPrevious,
  onContinue,
  isLastStep,
  reviewButtonText = "Continuer",
}: NavigationProps) {
  return (
    <div className="w-full px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 mb-4 ">
        <Button variant="outline" onClick={onPrevious}
        className="shadow-[0_3px_12px_0_#0000001A]">
          Précédent
        </Button>
  
        <div className="flex flex-col items-center gap-1">
          <Button
            onClick={onContinue}
            className="bg-[#1C5DF3] hover:bg-[#1749c2] text-white shadow-[0_3px_12px_0_#0000001A]"
          >
            {isLastStep ? reviewButtonText : "Continuer"}
          </Button>
        </div>
      </div>
    </div>
  )
}
