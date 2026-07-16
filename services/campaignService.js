import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const campaignsCollection = () => getDb().collection('campaigns');

export const listCampaigns = async (options = {}) => {
  const { status } = options;
  const query = status ? { status } : {};

  return campaignsCollection()
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
};

export const findCampaignById = async (id) => {
  return campaignsCollection().findOne({ _id: new ObjectId(id) });
};

export const createCampaign = async (campaignData) => {
  const payload = {
    ...campaignData,
    raisedAmount: 0,
    status: 'pending',
    createdAt: new Date()
  };

  const result = await campaignsCollection().insertOne(payload);
  return { ...payload, _id: result.insertedId };
};

export const updateCampaignStatus = async (id, status) => {
  await campaignsCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );
};
