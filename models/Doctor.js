// models/Doctor.js
import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  requestType: {
    type: String, // 'bodyScan', 'vitalCheck', 'bloodTest'
    required: true,
  },
  status: {
    type: String, // 'pending', 'completed'
    default: 'pending',
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DoctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialty: String,
  patients: [{
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    diagnosis: String,
    prescription: String, // Text-based prescription
  }],
  requests: [RequestSchema],
});

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
