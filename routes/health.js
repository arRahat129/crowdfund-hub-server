import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Crowdfund Hub API is running' });
});

export default router;
