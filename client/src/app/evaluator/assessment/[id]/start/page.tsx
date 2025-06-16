import { assessmentsData } from '@/constants/data-assessment'

type Props = {
  params: {
    id: string
  }
}

export default async function StartAssessmentPage({ params }: Props) {
  const assessment = assessmentsData.find(a => a.id === params.id)

  if (!assessment) {
    return <div className="p-8 text-red-500">Évaluation introuvable.</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{assessment.title}</h1>
      <p className="text-gray-600">
        Durée : {assessment.duration} min — {assessment.questionsCount} questions
      </p>
    </div>
  )
}
