import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const contributionsCollection = () => getDb().collection('contributions');

export const createContribution = async (contributionData) => {
  const payload = {
    ...contributionData,
    status: 'pending',
    createdAt: new Date()
  };

  const result = await contributionsCollection().insertOne(payload);
  return { ...payload, _id: result.insertedId };
};

export const listContributions = async (filter = {}) => {
  return contributionsCollection().find(filter).sort({ createdAt: -1 }).toArray();
};
