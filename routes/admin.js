import express from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { getDb } from '../config/db.js';

const router = express.Router();

router.get('/campaigns/pending', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const campaigns = await getDb().collection('campaigns').find({ status: 'pending' }).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/campaigns/:id/approve', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    await getDb().collection('campaigns').updateOne({ _id: req.params.id }, { $set: { status: 'approved' } });
    res.json({ success: true, message: 'Campaign approved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/campaigns/:id/reject', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    await getDb().collection('campaigns').updateOne({ _id: req.params.id }, { $set: { status: 'rejected' } });
    res.json({ success: true, message: 'Campaign rejected' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
