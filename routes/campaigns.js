import express from 'express';
import { createCampaign, findCampaignById, listCampaigns, updateCampaignStatus } from '../services/campaignService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const campaigns = await listCampaigns({ status: 'approved' });
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const campaign = await createCampaign(req.body);
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campaign = await findCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    await updateCampaignStatus(req.params.id, 'approved');
    res.json({ success: true, message: 'Campaign approved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
