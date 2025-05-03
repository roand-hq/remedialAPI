//importar todo lo de express que instale con npm install
import express from 'express'   
import doctorsRoutes from "./src/routes/doctors.js"
import registerDoctorRoutes from "./src/routes/registerDoctors.js"
import recoveryPasswordRoutes from "./src/routes/recoverPassword.js"
import cookieParser from 'cookie-parser'
// Crea una constante que es igual a la librería que importe
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use("/zacamil/doctors", doctorsRoutes)
app.use("/zacamil/registerDoctor", registerDoctorRoutes)
app.use("/zacamil/recoveryPassword", recoveryPasswordRoutes)
// Exporta la constante app en otros archivos
export default app;

