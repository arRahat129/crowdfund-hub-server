import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    type: { type: String, enum: ['credit-purchase', 'withdrawal'], default: 'credit-purchase' },
    status: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' },
    provider: { type: String, default: 'stripe' },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
