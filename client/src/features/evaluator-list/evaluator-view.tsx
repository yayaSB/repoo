"use client";
import React from 'react';
import EvaluatorTable from './evaluator';
import Header from '@/components/header';

export default function EvaluatorView() {
  return (
    <div className="flex flex-col h-screen bg-[#F7F9FA]">
      <Header
        withMenu={true}
        withLinks={false}
        showLogoLink={true}
        showProfile={true}
        role="evaluator" 
      />

      <main className="flex-1 mt-15 px-4 md:px-8 py-6 ">
        <EvaluatorTable />
      </main>
    </div>
  );
}
