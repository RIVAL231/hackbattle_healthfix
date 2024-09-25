// pages/api/patient/getRequests.js
import dbConnect from '../../../lib/dbconnect';
import Doctor from '../../../models/Doctor';
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
    const doctors = await Doctor.find({ 'patients.patientId': req.user.userId }).populate('requests.patientId', 'name');
    const prescriptions = [];
    const requests = [];

    doctors.forEach(doctor => {
      doctor.patients.forEach(patient => {
        if (patient.patientId.toString() === req.user.userId) {
          prescriptions.push({ doctor: doctor.name, prescription: patient.prescription });
        }
      });

      doctor.requests.forEach(request => {
        if (request.patientId._id.toString() === req.user.userId) {
          requests.push({ doctor: doctor.name, requestType: request.requestType, status: request.status });
        }
      });
    });

    res.status(200).json({ prescriptions, requests });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
