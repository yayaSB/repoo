import AssessmentDashboardView from '@/features/assessment/details/components/assessment-view';

interface Params {
  params: {
    id: string;
  };
}

export default function AssessmentDetailPage({ params }: Params) {
  return (
    <>
      <AssessmentDashboardView assessmentId={params.id} />
    </>
  );
}
