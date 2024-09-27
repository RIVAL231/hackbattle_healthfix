// pages/api/patient/profile.js
import dbConnect from '../../../lib/dbconnect';
import Patient from '../../../models/Patient';
import { verifyToken } from '../../../utils/auth';
import { check, validationResult } from 'express-validator';

const profileHandler = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate token
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, no token provided' });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);
    req.user = decoded;

    // Connect to the database
    await dbConnect();

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting data from request body
    const { familyHistory, medicalRecords, vitals } = req.body;

    // Find the patient by userId
    let patient = await Patient.findById(req.user.userId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    // Update patient's profile fields
    patient.familyHistory = familyHistory;
    patient.medicalRecords = medicalRecords;
    patient.vitals = vitals;

    // Save the updated patient data
    await patient.save();

    // Send success response
    return res.status(200).json({ patient });
  } catch (error) {
    console.error('Error updating patient profile:', error);
    return res.status(500).json({ error: 'Server error, please try again later' });
  }
};

// Validation middleware

export default async function handler(req, res) {
  // Apply validation middleware before the main handler
  return profileHandler(req, res);
}
