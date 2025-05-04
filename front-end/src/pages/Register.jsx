import { useState } from "react";
import "./CSS/register-style.css";
import { useNavigate } from "react-router";

const Register = ({ setDoctors }) => {
  const API = "http://localhost:4000/zacamil/registerDoctor";
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const cleanData = () => {
    setName("");
    setSpecialty("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!name || !specialty || !email || !password) {
      alert("Por favor llena todos los campos");
      return;
    }
    try {
      const newDoctor = {
        name,
        specialty,
        email,
        password,
      };
      console.log("Datos del doctor nuevo", newDoctor);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
        credentials:"include",
        mode:"cors"
      });

      if (!response.ok) {
        const errorData = await response.json()
        alert("Hubo un error registrando al nuevo doctor: " + errorData.message);
      }
      const data = await response.json();
      alert("Doctor registrado exitosamente");
      setDoctors((prevDoctors) => [...prevDoctors, data]); // la data vieja mas la nueva
      cleanData();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="registerForm">
      <form>
        <input
          type="text"
          placeholder="Nombre"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <select
          id="specialty"
          name="specialties"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="" className="placeholder-option">
            Especialidad
          </option>
          <option value="Cardiologia">Cardiología</option>
          <option value="Pediatria">Pediatría</option>
          <option value="Dermatologia">Dermatología</option>
          <option value="Neurologia">Neurología</option>
          <option value="Ginecologia">Ginecología</option>
        </select>
        <input
          type="email"
          placeholder="Correo electrónico"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Registrar Doctor
        </button>
        <button type="button" className="listaBtn" onClick={()=>{navigate("/List")}}>
          Lista de doctores
        </button>
      </form>
    </div>
  );
};
export { Register };
