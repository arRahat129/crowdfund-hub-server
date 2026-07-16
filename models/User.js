import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    photoUrl: { type: String, default: '' },
    role: { type: String, enum: ['supporter', 'creator', 'admin'], default: 'supporter' },
    credits: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    provider: { type: String, default: 'email' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
