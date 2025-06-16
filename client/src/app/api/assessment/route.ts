import { NextRequest, NextResponse } from 'next/server';
import * as assessmentController from '@/lib/controllers/assessmentController';

// GET all assessments
export async function GET(request: NextRequest) {
  return await assessmentController.getAllAssessments(request);
}

// POST new assessment
export async function POST(request: NextRequest) {
  return await assessmentController.createAssessment(request);
}
