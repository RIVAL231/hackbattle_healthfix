// pages/api/doctor/patients.js
import dbConnect from '../../../lib/dbconnect';
import Doctor from '../../../models/Doctor';
import Patient from '../../../models/Patient';
import { verifyToken } from '../../../utils/auth';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    await dbConnect();
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

handler.get(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.userId).populate('patients.patientId');
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.status(200).json({ patients: doctor.patients });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
