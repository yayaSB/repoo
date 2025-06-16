"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import  Header  from "@/components/header"
import { Menu } from "@/features/assessment/evaluation/components/menu"
import { CategoryDescription } from "@/features/assessment/evaluation/components/category"
import { EvaluationForm } from "@/features/assessment/evaluation/components/evaluation-form"
import { Navigation } from "@/features/assessment/evaluation/components/navigation"
import { categories, questionsMap, defaultAnswers, ASSESSMENTS } from "@/constants/mock-evaluations"
import { useAssessment } from "@/hooks/use-assessment"
import { Skeleton } from "@/components/ui/skeleton"

const categoryToStep: Record<string, number> = {
  "Sécurité IT": 1,
  "Gouvernance IT": 2,
  "Infrastructure": 3,
  "Applications": 4,
  "Données": 5,
  "Innovation": 6,
}

interface EvaluationViewProps {
  assessmentId: string
}

export function EvaluationView({ assessmentId }: EvaluationViewProps) {
  const assessment = ASSESSMENTS.find((assessment) => assessment.id === assessmentId)

  if (!assessment) {
    return null
  }

  const assessmentTitle = assessment.title
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Gouvernance IT")
  const { answers, loading, error, updateAnswer, saveAssessment } = useAssessment(assessmentId)

  const [currentStep, setCurrentStep] = useState(categoryToStep[activeTab])
  const totalSteps = Object.keys(categoryToStep).length

  const handleAnswerChange = (questionId: number, value: string) => {
    updateAnswer(activeTab, questionId, value)
  }

  const handleTextAreaChange = (questionId: number, value: string) => {
    updateAnswer(activeTab, questionId, value)
  }

  const handleContinue = async () => {
    await saveAssessment()
    const nextCategoryIndex = categories.indexOf(activeTab) + 1
    if (nextCategoryIndex < categories.length) {
      const nextCategory = categories[nextCategoryIndex]
      setActiveTab(nextCategory)
      setCurrentStep(categoryToStep[nextCategory])
    } else {
      await saveAssessment()
      alert("Assessment submitted! Viewing results...")
    }
  }

  const handlePrevious = () => {
    if (categories.indexOf(activeTab) > 0) {
      const previousCategory = categories[categories.indexOf(activeTab) - 1]
      setActiveTab(previousCategory)
      setCurrentStep(categoryToStep[previousCategory])
    } else {
      router.back()
    }
  }

  const isLastStep = activeTab === "Innovation"

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Card className="w-full max-w-5xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center py-6">
        <Card className="w-full max-w-5xl p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="mt-2">{error}</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-[#F7F9FA] min-h-screen w-full">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header
          position="fixed"
          background="white"
          withMenu={false}
          withLinks={false}
          withLanguage={true}
          showLogoLink={false}
        />
      </div>
      <div className="pt-40 pb-10 overflow-y-auto max-h-screen">
        <div className="flex justify-center px-4">
          <div className="w-full max-w-6xl px-4">
            <Card className="w-full bg-white shadow-lg rounded-lg ">
              <CardHeader className="pt-10 pb-2">
                <h1 className="font-poppins mb-6 text-[#282829] font-semibold text-[49px] leading-[100%] text-center align-middle">
                  {assessmentTitle}
                </h1>
              </CardHeader>

              <CardContent className="space-y-5 ">
                <Tabs
                  value={activeTab}
                  onValueChange={(newTab) => {
                    setActiveTab(newTab)
                    setCurrentStep(categoryToStep[newTab])
                  }}
                  className="w-full "
                >
                  <div className="mb-4 px-5">
                    <Menu activeTab={activeTab} />
                  </div>

                  {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                      <CategoryDescription category={category} />
                      <EvaluationForm
                        category={category}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                        onTextAreaChange={handleTextAreaChange}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
                <div className="w-full px-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[14px] font-medium mb-1">
                      <span className="text-[#5570F1]">Step {currentStep}</span>
                      <span className="text-[#737475]"> of {totalSteps}</span>
                    </span>
                    <div className="relative w-full h-[6px] bg-[#E5E2FE] rounded-full overflow-visible">
                      <div
                        className="absolute top-[-3px] h-[12px] rounded-full bg-[#1C5DF3] transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Navigation
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onPrevious={handlePrevious}
                  onContinue={handleContinue}
                  isLastStep={isLastStep}
                  reviewButtonText={isLastStep ? "Voir les résultats" : "Continuer"}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
