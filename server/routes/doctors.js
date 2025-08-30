import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Middleware to fetch doctor by ID
const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    req.doctor = doctor;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single doctor
router.get('/:id', getDoctor, (req, res) => {
  res.json(req.doctor);
});

// Add a new doctor
router.post('/add', async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const newDoctor = new Doctor({ name, specialty });
    const savedDoctor = await newDoctor.save();
    res.json(savedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a doctor
router.put('/update/:id', async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, specialty },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a doctor
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
