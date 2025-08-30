import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

//Get all appointments
router.get("/", async (res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Add new appointment
router.post('/add', async(req, res)=>{
    try{
        const {patientName, doctorName, data} = req.body;
        const newAppointment = new Appointment({patientName, doctorName, data});
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

//Update appointment
router.put('/update/:id', async (req, res)=>{
    try{
        const {patientName, doctorName, data} = req.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {patientName, doctorName, data},
            {new: true}
        );
        if(!updatedAppointment){
            return res.status(404).json({message: 'Appointment not found'});
        }
        res.json(updatedAppointment);
    } catch(err){
        res.status(400).json({message: err.message});
    }
})


//Delete appointment
router.delete('/delete/:id', async(req, res)=>{
    try{
        const deleted = await Appointment.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({message: 'Appointment not found'});
        }
        res.json({message: 'Appointment deleted successfully'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;