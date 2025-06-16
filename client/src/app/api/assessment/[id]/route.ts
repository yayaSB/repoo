import { NextRequest } from 'next/server';
import * as assessmentController from '@/lib/controllers/assessmentController';

// Get assessment by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return await assessmentController.getAssessmentById(request, { id });
}

// Update assessment by ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return await assessmentController.updateAssessment(request, { id });
}

// Delete assessment by ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return await assessmentController.deleteAssessment(request, { id});
}
