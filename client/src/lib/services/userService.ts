import  dbConnect  from '@/lib/config/dbConnect'; 
import User from '@/lib/models/userModel'; 

export const getAllUsers = async () => {
  await dbConnect(); 
  return User.find(); // Get all users
};

export const getUserById = async (userId: string) => {
  await dbConnect(); 
  return User.findById(userId); // Get a user by ID
};

export const createUser = async (userData: any) => {
  await dbConnect(); 
  const newUser = new User(userData); // Create a new user
  return newUser.save();
};

export const updateUser = async (userId: string, userData: any) => {
  await dbConnect(); 
  return User.findByIdAndUpdate(userId, userData, { new: true }); // Update a user
};

export const deleteUser = async (userId: string) => {
  await dbConnect(); 
  return User.findByIdAndDelete(userId); // Delete a user
};
