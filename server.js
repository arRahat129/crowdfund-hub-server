import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import campaignsRoutes from './routes/campaigns.js';
import meRoutes from './routes/me.js';
import contributionsRoutes from './routes/contributions.js';
import creatorCampaignsRoutes from './routes/creatorCampaigns.js';
import adminRoutes from './routes/admin.js';
import withdrawalRoutes from './routes/withdrawals.js';
import notificationRoutes from './routes/notifications.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/contributions', contributionsRoutes);
app.use('/api/creator-campaigns', creatorCampaignsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', meRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Crowdfund Hub server is running' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
