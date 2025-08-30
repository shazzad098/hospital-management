import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// Get all patients
router.get('/', async (res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add new patient
router.post('/add', async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const newPatient = new Patient({ name, age, gender });
    const savedPatient = await newPatient.save();
    res.json(savedPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update patient data
router.put('/update/:id', async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, age, gender },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete patient by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
