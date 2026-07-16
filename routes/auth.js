import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../services/userService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, photoUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultCredits = role === 'creator' ? 20 : 50;

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      photoUrl: photoUrl || '',
      role: role || 'supporter',
      credits: defaultCredits,
      provider: 'email',
      createdAt: new Date()
    });

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role, credits: user.credits, photoUrl: user.photoUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role, credits: user.credits, photoUrl: user.photoUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
