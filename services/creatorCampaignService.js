import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const campaignsCollection = () => getDb().collection('campaigns');

export const listCreatorCampaigns = async (creatorEmail) => {
  return campaignsCollection().find({ creatorEmail }).sort({ createdAt: -1 }).toArray();
};

export const createCreatorCampaign = async (campaignData) => {
  const payload = {
    ...campaignData,
    status: 'pending',
    raisedAmount: 0,
    createdAt: new Date()
  };

  const result = await campaignsCollection().insertOne(payload);
  return { ...payload, _id: result.insertedId };
};

export const updateCreatorCampaign = async (id, updates) => {
  await campaignsCollection().updateOne({ _id: new ObjectId(id) }, { $set: updates });
};

export const deleteCreatorCampaign = async (id) => {
  await campaignsCollection().deleteOne({ _id: new ObjectId(id) });
};
