// models/Admin.js
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
