import * as assessmentService from '@/lib/services/assessmentService';
import { NextRequest, NextResponse } from 'next/server';

// Get all assessments
export const getAllAssessments = async (req: NextRequest) => {
  try {
    const assessments = await assessmentService.getAllAssessments();
    return NextResponse.json(assessments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Get assessment by ID
export const getAssessmentById = async (req: NextRequest, { id }: { id: string }) => {
  try {
    const assessment = await assessmentService.getAssessmentById(id);
    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }
    return NextResponse.json(assessment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Create new assessment
export const createAssessment = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newAssessment = await assessmentService.createAssessment(body);
    return NextResponse.json(
      { message: '✅ Assessment successfully created', assessment: newAssessment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Update assessment
export const updateAssessment = async (req: NextRequest, { id }: { id: string }) => {
  try {
    const body = await req.json();
    const updated = await assessmentService.updateAssessment(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: '✅ Assessment successfully updated', assessment: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Delete assessment
export const deleteAssessment = async (req: NextRequest, { id }: { id: string }) => {
  try {
    const deleted = await assessmentService.deleteAssessment(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: '✅ Assessment successfully deleted' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};
