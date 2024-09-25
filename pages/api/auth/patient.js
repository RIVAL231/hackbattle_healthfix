// pages/api/auth/patient.js
import dbConnect from '../../../lib/dbConnect';
import Patient from '../../../models/Patient';
import { hashPassword, generateToken, verifyPassword } from '../../../utils/auth';

export default async function handler(req, res) {
  await dbConnect();

  const { method, body } = req;
  const { email, password, name, type } = body;

  if (method === 'POST') {
    if (type === 'register') {
      // Registration logic
      try {
        let patient = await Patient.findOne({ email });
        if (patient) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);

        patient = new Patient({
          name,
          email,
          password: hashedPassword,
        });

        await patient.save();
        const token = generateToken(patient);

        return res.status(201).json({ token, patient });
      } catch (error) {
        return res.status(500).json({ error: 'Server error during registration' });
      }
    } else if (type === 'login') {
      // Login logic
      try {
        const patient = await Patient.findOne({ email });
        if (!patient) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await verifyPassword(password, patient.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(patient);
        return res.status(200).json({ token, patient });
      } catch (error) {
        return res.status(500).json({ error: 'Server error during login' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
