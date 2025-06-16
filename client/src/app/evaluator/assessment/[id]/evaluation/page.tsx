import { EvaluationView } from "@/features/assessment/evaluation/components/evaluation-view"

export default function EvaluationPage({ params }: { params: { id: string } }) {
  return <EvaluationView assessmentId={params.id} />
}
