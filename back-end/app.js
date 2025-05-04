//importar todo lo de express que instale con npm install
import express from "express";
import doctorsRoutes from "./src/routes/doctors.js";
import registerDoctorRoutes from "./src/routes/registerDoctors.js";
import recoveryPasswordRoutes from "./src/routes/recoverPassword.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import loginRoutes from "./src/routes/login.js"
// Crea una constante que es igual a la librería que importe
const app = express();

app.use(cors({
     origin: "http://localhost:5173",
      credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/zacamil/doctors", doctorsRoutes);
app.use("/zacamil/registerDoctor", registerDoctorRoutes);
app.use("/zacamil/recoveryPassword", recoveryPasswordRoutes);
app.use("/zacamil/login",loginRoutes)
// Exporta la constante app en otros archivos
export default app;
