import dbConnect from '@/lib/config/dbConnect';
import Assessment from '@/lib/models/Assessment';

export const getAllAssessments = async () => {
  await dbConnect();
  return Assessment.find(); // Get all assessments
};

export const getAssessmentById = async (id: string) => {
  await dbConnect();
  return Assessment.findById(id); // Get assessment by ID
};

export const createAssessment = async (data: any) => {
  await dbConnect();
  const assessment = new Assessment(data); // Create a new assessment
  return assessment.save();
};

export const updateAssessment = async (id: string, data: any) => {
  await dbConnect();
  return Assessment.findByIdAndUpdate(id, data, { new: true }); // Update an assessment
};

export const deleteAssessment = async (id: string) => {
  await dbConnect();
  return Assessment.findByIdAndDelete(id); // Delete an assessment
};
