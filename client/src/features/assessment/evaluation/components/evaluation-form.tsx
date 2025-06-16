"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { questionsMap } from "@/constants/mock-evaluations"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Question {
  id: number
  question: string
  options?: string[]
  isTextArea?: boolean
}

interface EvaluationFormProps {
  category: string
  assessmentTitle?: string
  initialAnswers?: Record<number, string | null>
  onSubmit?: (answers: Record<number, string | null>) => void
  readonly?: boolean
  currentStep: number
  totalSteps: number
}

export function EvaluationForm({
  category,
  initialAnswers = {},
  onSubmit,
  readonly = false,
  assessmentTitle,
  currentStep,
  totalSteps
}: EvaluationFormProps) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, string | null>>(initialAnswers)
  const questions: Question[] = questionsMap[category as keyof typeof questionsMap] || []

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleTextAreaChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit ? onSubmit(answers) : console.log("Submitted answers:", answers)
    router.push(`/evaluation/confirmation?category=${category}`)
  }

  const allQuestionsAnswered = questions.every(q =>
    q.isTextArea ? true : answers[q.id] !== undefined && answers[q.id] !== null
  )

  return (
    <div className="w-full mx-auto mt-10 px-5 flex flex-col  ">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 flex-grow ">
        {questions.map((q: Question, index: number) => (
          <div key={q.id} className="border p-6 rounded-md bg-white shadow-sm">
          <p className="mb-4 text-[20px] font-bold text-[#282829]">
            {index + 1}. {q.question} {!q.isTextArea && "*"}
          </p>
        
          {q.isTextArea ? (
            <textarea
            className="w-full mx-auto h-8 border-b-2 border-gray-300 focus:outline-none focus:border-[#1C5DF3] text-[16px] text-[#111113] placeholder:text-gray-400 resize-none bg-transparent p-0"
            placeholder="Saisir votre réponse..."
            value={answers[q.id] as string || ""}
            onChange={(e) => handleTextAreaChange(q.id, e.target.value)}
            readOnly={readonly}
          />
          ) : (
            <RadioGroup
              value={answers[q.id] as string || ""}
              onValueChange={(value) => handleAnswerChange(q.id, value)}
              disabled={readonly}
            >
              {q.options?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2 gap-2">
                  <RadioGroupItem
                    value={option}
                    id={`q${q.id}-option${i}`}
                      className="w-5 h-5 border-2 border-gray-300 rounded-full data-[state=checked]:bg-[#1C5DF3] data-[state=checked]:border-[#1C5DF3] appearance-none [&>span]:hidden"
                  />
                  <Label
                    htmlFor={`q${q.id}-option${i}`}
                    className="text-[20px] text-[#4C4D4D]"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
        ))}
      </form>
    </div>
  )
}
