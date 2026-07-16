import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const withdrawalsCollection = () => getDb().collection('withdrawals');

export const createWithdrawal = async (withdrawalData) => {
  const payload = {
    ...withdrawalData,
    status: 'pending',
    createdAt: new Date()
  };

  const result = await withdrawalsCollection().insertOne(payload);
  return { ...payload, _id: result.insertedId };
};

export const listWithdrawals = async (filter = {}) => {
  return withdrawalsCollection().find(filter).sort({ createdAt: -1 }).toArray();
};
