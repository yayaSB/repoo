import { NextRequest } from 'next/server';
import * as userController from '@/lib/controllers/userController'; 

// Get a user by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return await userController.getUserById(request, { id });
}

// Update a user by ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return await userController.updateUser(request, { id });
}

// Delete a user by ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return await userController.deleteUser(request, { id });
}
