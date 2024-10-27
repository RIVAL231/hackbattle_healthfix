import dbConnect from '../../../lib/dbconnect';
import Patient from '../../../models/Patient';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract and verify token
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    // Connect to the database
    await dbConnect();

    // Fetch patient by email
    const patient = await Patient.findOne({ email: req.user.email });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Respond with the patient's profile
    return res.status(200).json({ patient });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: 'Server error' });
  }
}
