import doctors from "../models/doctors.js";
import bcrypt from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; //generar tokens
import { config } from "../config.js";

const registerDoctorsController = {};

registerDoctorsController.register = async (req, res) => {
  const { name, specialty, email, password, verified } = req.body;
  try {
    const doctoreExists = await doctors.findOne({ email });
    if (doctoreExists)
      return res.status(400).json({
        message: "There is already an existing doctor with this email"
      });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new doctors({
      name,
      specialty,
      email,
      password: encryptedPassword,
      verified,
    });
    await newDoctor.save();
    //generar token
    jsonwebtoken.sign(
      { id: newDoctor._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({ message: "Doctor registered" });
      }
    );
  } catch (error) {
    console.log("error: " + error);
    res.json({ message: "errorsito" });
  }
};
export default registerDoctorsController;
