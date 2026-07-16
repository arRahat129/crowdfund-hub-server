import { getDb } from '../config/db.js';

const notificationsCollection = () => getDb().collection('notifications');

export const createNotification = async (notificationData) => {
  const payload = {
    ...notificationData,
    createdAt: new Date(),
    read: false
  };

  const result = await notificationsCollection().insertOne(payload);
  return { ...payload, _id: result.insertedId };
};

export const listNotifications = async (userId) => {
  return notificationsCollection().find({ userId }).sort({ createdAt: -1 }).toArray();
};
