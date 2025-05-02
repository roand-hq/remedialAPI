import doctorsModel from "../models/doctors.js"
const doctorsController = {}

doctorsController.getDoctors = async(req,res) =>{ 
    const Doctors = await doctorsModel.find()
    res.json(Doctors)
}

doctorsController.createDoctor = async(req,res) => {
    const {name, specialty,email,password,verified} = req.body;
    const newDoctor = new doctorsModel({name, specialty,email,password,verified})
    await newDoctor.save()
    res.json({message: "Doctore created successfully"})
}

doctorsController.deleteDoctor = async(req,res) => {
    const {email} = req.body
    const deletedDoctor = await doctorsModel.findOneAndDelete({email})
    res.json({message: "Doctor deleted successfully"})
}
doctorsController.updateDoctor = async(req,res) => {
    const {name, specialty,email,password,verified} = req.body;
    const updatedEmployee = await doctorsModel.findByIdAndUpdate({email},
        {name, specialty,email,password,verified},
        {new: true}
    )
}
doctorsController.get1Doctor = async(req,res) => {
    const {email} = req.body
    const Doctor = await doctorsModel.findOne({email})
    res.json(Doctor)
}

export default doctorsController