// pages/api/patient/respondRequest.js
import dbConnect from '../../../lib/dbConnect';
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

handler.post(async (req, res) => {
  const { requestId } = req.body;
  try {
    const doctor = await Doctor.findOne({ 'requests._id': requestId });
    if (!doctor) return res.status(404).json({ error: 'Request not found' });

    const request = doctor.requests.id(requestId);
    if (request.patientId.toString() !== req.user.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    request.status = 'completed';
    await doctor.save();

    res.status(200).json({ message: 'Request completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
