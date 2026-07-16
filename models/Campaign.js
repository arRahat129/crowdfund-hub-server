import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    story: { type: String, required: true },
    category: { type: String, required: true },
    fundingGoal: { type: Number, required: true },
    minimumContribution: { type: Number, required: true },
    deadline: { type: Date, required: true },
    rewardInfo: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creatorName: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    amountRaised: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Campaign', campaignSchema);
