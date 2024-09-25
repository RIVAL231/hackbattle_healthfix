// pages/api/patient/selectDoctor.js
import dbConnect from '../../../lib/dbConnect';
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
    const doctors = await Doctor.find({}, 'name specialty email');
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

handler.post(async (req, res) => {
  const { doctorId } = req.body;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const patient = await Patient.findById(req.user.userId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    doctor.patients.push({ patientId: patient._id });
    await doctor.save();

    res.status(200).json({ message: 'Doctor selected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
