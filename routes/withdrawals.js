import express from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { createWithdrawal, listWithdrawals } from '../services/withdrawalService.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('creator'), async (req, res) => {
  try {
    const withdrawal = await createWithdrawal({
      creatorId: req.user.id,
      amount: req.body.amount,
      bankDetails: req.body.bankDetails || ''
    });
    res.status(201).json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create withdrawal request' });
  }
});

router.get('/', authenticate, authorizeRoles('creator', 'admin'), async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { creatorId: req.user.id };
    const withdrawals = await listWithdrawals(filter);
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch withdrawals' });
  }
});

export default router;
