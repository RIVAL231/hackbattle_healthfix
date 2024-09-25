// models/Patient.js
import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
});

const OrderSchema = new mongoose.Schema({
  type: {
    type: String, // 'bloodTest', 'scan', 'medicines'
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
});

const RequestSchema = new mongoose.Schema({
  requestType: {
    type: String, // 'bodyScan', 'vitalCheck', 'bloodTest'
    required: true,
  },
  status: {
    type: String, // 'pending', 'completed'
    default: 'pending',
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const MedicalRecordSchema = new mongoose.Schema({
  bloodType: String,
  allergies: [String],
  currentMedications: [String],
  previousTreatments: [String],
  diagnosisReports: [String], // URLs of uploaded reports
});

const VitalsSchema = new mongoose.Schema({
  bloodPressure: String,
  bodyTemperature: Number,
  heartRate: Number,
  respiratoryRate: Number,
  // Add more vitals as needed
});

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  familyHistory: {
    diabetes: Boolean,
    heartDisease: Boolean,
    kidneyStones: Boolean,
    lungDiseases: Boolean,
    cancer: Boolean,
    // Add more diseases as needed
  },
  medicalRecords: MedicalRecordSchema,
  vitals: VitalsSchema,
  appointments: [AppointmentSchema],
  orders: [OrderSchema],
  requests: [RequestSchema],
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
