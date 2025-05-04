import bcrypt from "bcryptjs";
import doctors from "../models/doctors.js";
const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userFound;
    userFound = await doctors.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Ese doctor no esta registrado" });
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.log("error al iniciar sesion: " + error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export { loginController };
