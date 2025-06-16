import React from 'react';
import AssessmentTableList from './assessment-table-list';
import Header from '@/components/header';

interface AssessmentTableListViewProps {
  role: "creator" | "evaluator";
}

const AssessmentTableListView: React.FC<AssessmentTableListViewProps> = ({ role }) => {
  return (
    <div className="flex flex-col h-screen bg-[#F7F9FA]">
      <Header
        withMenu={true}
        withLinks={false}      
        showProfile={true}
        showLogoLink={true}
        role={role}
      />
      <main className="flex-1 overflow-auto">
        <AssessmentTableList />
      </main>
    </div>
  );
};

export default AssessmentTableListView;
