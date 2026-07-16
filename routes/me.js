import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticate, (req, res) => {
  res.json({ success: true, user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, credits: req.user.credits, photoUrl: req.user.photoUrl } });
});

export default router;
