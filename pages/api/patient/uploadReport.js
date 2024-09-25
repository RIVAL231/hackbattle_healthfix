// pages/api/patient/uploadReport.js
import dbConnect from '../../../lib/dbconnect';
import Patient from '../../../models/Patient';
import uploadMiddleware from '../../../utils/multerConfig';
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

handler.use(uploadMiddleware);

handler.post(async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.userId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const { file } = req;
    patient.medicalRecords.diagnosisReports.push(`/uploads/${file.filename}`);

    await patient.save();
    res.status(200).json({ message: 'Report uploaded successfully', patient });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
