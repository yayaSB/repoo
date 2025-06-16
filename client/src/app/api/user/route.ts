import { NextRequest, NextResponse } from 'next/server';
import * as userController from '@/lib/controllers/userController'; 

// Get all users
export async function GET(request: NextRequest) {
  return await userController.getAllUsers(request);
}

// Create a new user
export async function POST(request: NextRequest) {
  return await userController.createUser(request);
}
