// pages/api/auth/admin.js
import dbConnect from '../../../lib/dbConnect';
import Admin from '../../../models/Admin';
import { hashPassword, generateToken, verifyPassword } from '../../../utils/auth';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();
  
  const { email, password,type } = req.body;
if(type == "register"){
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();
    const token = generateToken(admin);

    res.status(201).json({ token, admin });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}});
handler.post(async (req, res) => {
  await dbConnect();
  const { email, password,type } = req.body;
if(type == "login"){
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await verifyPassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(admin);

    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}});

export default handler;
