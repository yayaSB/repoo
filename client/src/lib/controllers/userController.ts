import * as userService from '@/lib/services/userService';
import { NextRequest, NextResponse } from 'next/server';

// Get all users
export const getAllUsers = async (req: NextRequest) => {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Get a user by ID
export const getUserById = async (req: NextRequest, { id }: { id: string }) => {
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Create a new user
export const createUser = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newUser = await userService.createUser(body);
    return NextResponse.json(
      { message: 'User successfully created', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Update a user
export const updateUser = async (req: NextRequest, { id }: { id: string }) => {
  try {
    const body = await req.json();
    const updatedUser = await userService.updateUser(id, body);
    return NextResponse.json(
      { message: 'User successfully updated', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};

// Delete a user
export const deleteUser = async (req: NextRequest, { id }: { id: string }) => {
  try {
    await userService.deleteUser(id);
    return NextResponse.json({ message: 'User successfully deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};
