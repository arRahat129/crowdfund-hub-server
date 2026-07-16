import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createCreatorCampaign, deleteCreatorCampaign, listCreatorCampaigns, updateCreatorCampaign } from '../services/creatorCampaignService.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const campaigns = await listCreatorCampaigns(req.user.email);
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const campaign = await createCreatorCampaign({
      ...req.body,
      creatorEmail: req.user.email,
      creatorName: req.user.name,
      creatorId: req.user._id.toString()
    });

    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    await updateCreatorCampaign(req.params.id, req.body);
    res.json({ success: true, message: 'Campaign updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await deleteCreatorCampaign(req.params.id);
    res.json({ success: true, message: 'Campaign deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
