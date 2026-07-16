import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createContribution, listContributions } from '../services/contributionService.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  try {
    const contribution = await createContribution({
      ...req.body,
      supporterId: req.user._id.toString(),
      supporterEmail: req.user.email,
      supporterName: req.user.name
    });

    res.status(201).json({ success: true, contribution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const contributions = await listContributions({ supporterEmail: req.user.email });
    res.json({ success: true, contributions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
