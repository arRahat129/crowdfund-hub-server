import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createPaymentIntent } from '../services/paymentService.js';

const router = express.Router();

router.post('/intent', authenticate, async (req, res) => {
  try {
    const intent = await createPaymentIntent(req.body.amount || 0, req.body.currency || 'usd');
    res.json(intent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

export default router;
