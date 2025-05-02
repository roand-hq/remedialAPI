import express from "express";

const router = express.Router();
import doctorsController from "../controllers/doctorsController.js";

router
  .route("/")
  .get(doctorsController.getDoctors)
  .post(doctorsController.createDoctor);

router
  .route("/:email")
  .delete(doctorsController.deleteDoctor)
  .put(doctorsController.updateDoctor)
  .get(doctorsController.get1Doctor);

export default router;
