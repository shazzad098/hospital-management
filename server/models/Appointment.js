import mongoose from "mongoose";

const appontmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appontmentSchema);
export default Appointment;