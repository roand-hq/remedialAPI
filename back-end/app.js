//importar todo lo de express que instale con npm install
import express from 'express'   
import doctorsRoutes from "./src/routes/doctors.js"
import registerDoctorRoutes from "./src/routes/registerDoctors.js"
// Crea una constante que es igual a la librería que importe
const app = express();

app.use(express.json())
app.use("/zacamil/doctors", doctorsRoutes)
app.use("/zacamil/registerDoctor", registerDoctorRoutes)
// Exporta la constante app en otros archivos
export default app;

