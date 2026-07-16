import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const usersCollection = () => getDb().collection('users');

export const findUserByEmail = async (email) => {
  return usersCollection().findOne({ email });
};

export const findUserById = async (id) => {
  return usersCollection().findOne({ _id: new ObjectId(id) });
};

export const createUser = async (userData) => {
  const result = await usersCollection().insertOne(userData);
  return { ...userData, _id: result.insertedId };
};

export const updateUserCredits = async (userId, credits) => {
  await usersCollection().updateOne({ _id: new ObjectId(userId) }, { $set: { credits } });
};
