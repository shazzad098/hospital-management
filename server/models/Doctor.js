// models/Doctor.js

import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    // Add more fields as needed
  },
  {
    timestamps: true, // createdAt & updatedAt auto add হবে
  }
);

// Prevent OverwriteModelError during hot reload
const Doctor =
  mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;
