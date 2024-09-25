// pages/api/auth/doctor.js
import dbConnect from '../../../lib/dbConnect';
import Doctor from '../../../models/Doctor';
import { hashPassword, generateToken, verifyPassword } from '../../../utils/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, email, password, name, specialty } = req.body;

  if (type === 'register') {
    // Registration logic
    try {
      let doctor = await Doctor.findOne({ email });
      if (doctor) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await hashPassword(password);

      doctor = new Doctor({
        name,
        email,
        password: hashedPassword,
        specialty,
      });

      await doctor.save();
      const token = generateToken(doctor);

      return res.status(201).json({ token, doctor });
    } catch (error) {
      return res.status(500).json({ error: 'Server error during registration' });
    }
  } else if (type === 'login') {
    // Login logic
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const isMatch = await verifyPassword(password, doctor.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = generateToken(doctor);

      return res.status(200).json({ token, doctor });
    } catch (error) {
      return res.status(500).json({ error: 'Server error during login' });
    }
  } else {
    return res.status(400).json({ error: 'Invalid type specified' });
  }
}
