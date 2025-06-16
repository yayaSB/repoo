'use client';

import React from 'react';
import { AssessmentDetailView } from './assessment-detail';
import Header from '@/components/header';

interface AssessmentDashboardViewProps {
  assessmentId: string;
}

const AssessmentDashboardView: React.FC<AssessmentDashboardViewProps> = ({ assessmentId }) => {
  return (
    <div className="flex flex-col h-screen ">
      <Header
        withMenu={true}
        withLinks={false}
        showProfile={true}
        activeTab="evaluation"
        tabs={[
          { key: "dashboard", label: "Dashboard", path: "/dashboard" },
          { key: "evaluation", label: "Mes évaluations", path: "/creator/assessments" },
          { key: "Gérer les évaluateurs", label: "Gérer les évaluateurss", path: "/dashboard/evaluation" },
        ]}
      />

      <main className="flex-1 px-4 py-6 mt-15 md:px-8">
        <AssessmentDetailView assessmentId={assessmentId} />
      </main>
    </div>
  );
};

export default AssessmentDashboardView;
