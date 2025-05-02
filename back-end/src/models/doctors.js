import { Schema, model } from "mongoose";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    specialty: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Por favor, ingrese un correo electrónico válido",
      ],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: [8, "La contraseña debe tener mínimo 8 caracteres"],
    },
    verified: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
export default model("doctors", doctorSchema);
