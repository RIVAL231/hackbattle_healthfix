// pages/api/doctor/addRequest.js
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

handler.post(async (req, res) => {
  const { patientId, requestType } = req.body;
  try {
    const doctor = await Doctor.findById(req.user.userId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    doctor.requests.push({ patientId, requestType });
    await doctor.save();

    res.status(200).json({ message: 'Request added successfully', doctor });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
