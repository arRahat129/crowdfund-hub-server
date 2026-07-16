import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createNotification, listNotifications } from '../services/notificationService.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const notifications = await listNotifications(req.user.id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const notification = await createNotification({
      userId: req.body.userId || req.user.id,
      message: req.body.message,
      type: req.body.type || 'general'
    });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification' });
  }
});

export default router;
