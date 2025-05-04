import { sendMail, HTMLRecoveryMail } from "../utils/mailRecoveryPassword.js";
import doctors from "../models/doctors.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import bcrypt from "bcryptjs";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  const { email } = req.body;
  try {
    let userFound;
    userFound = await doctors.findOne({ email });
    if (!userFound) return res.json({ message: "User not found" });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jsonwebtoken.sign(
      { email, code, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );
    res.cookie("tokenCodigoRecuperacion", token, { maxAge: 10 * 60 * 1000 });
    sendMail(
      email,
      "Codigo de recuperacion de contraseña",
      `Tu codigo de verificacion es ${code}`,
      HTMLRecoveryMail(code)
    );
    res.json({ message: "Verification code sent" });
  } catch (error) {
    console.log("Algo salio mal al enviar el codigo de verificacion: " + error);
  }
};

recoveryPasswordController.verifyCode = async (req, res) => {
  const { code } = req.body;
  try {
    const token = req.cookies.tokenCodigoRecuperacion;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code)
      return res.json({ message: "Verification code invalid/incorrect" });
    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "10m" }
    );
    res.cookie("tokenCodigoRecuperacion", newToken, { maxAge: 10 * 60 * 1000 });
    res.json({ message: "Confirmacion de codigo exitosa" });
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(500).json({ message: "Internal server error during code verification" });
  }
};

recoveryPasswordController.newPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.cookies.tokenCodigoRecuperacion;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (!decoded.verified)
      return res.status(400).json({ message: "Code hasn't been verified" });
    const { email } = decoded;
    const hashedPass = await bcrypt.hash(newPassword, 10);
    let updateUser;
    updateUser = await doctors.findOneAndUpdate(
      { email },
      { password: hashedPass },
      { new: true }
    );
    res.clearCookie("tokenCodigoRecuperacion");
    res.status(200).json({ message: "Password has been changed successfully" });
  } catch (error) {
    console.log("El error cambiando la contraseña es: " + error);
  }
};

export { recoveryPasswordController };
