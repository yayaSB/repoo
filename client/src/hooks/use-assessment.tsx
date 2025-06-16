import { useState } from "react"
import { questionsMap, defaultAnswers } from "@/constants/mock-evaluations"

// Define the type for answers
type AnswersType = {
  [category: string]: {
    [questionId: number]: string | null;
  };
};

export function useAssessment(assessmentId: string) {
  const [answers, setAnswers] = useState<AnswersType>(defaultAnswers)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateAnswer = (category: string, questionId: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: {
        ...prevAnswers[category],
        [questionId]: value,
      },
    }))
  }

  const saveAssessment = async () => {
    try {
      setLoading(true)
      // Simulate saving the assessment to a server or database
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLoading(false)
      // Implement actual saving logic
    } catch (error) {
      setLoading(false)
      setError("Failed to save assessment")
    }
  }

  return {
    answers,
    loading,
    error,
    updateAnswer,
    saveAssessment,
  }
}
