import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DoctorCard } from "../assets/DoctorCard";
const List = ({ doctors, getDoctors }) => {
  useEffect(() => {
    getDoctors();
  }, []);
  const navigate = useNavigate()
  const deleteDoctor = async (email) => {
    try {
      let goingToDelete = {
        email: email,
      };
      const response = await fetch(
        `http://localhost:4000/zacamil/doctors/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goingToDelete),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      getDoctors();
    } catch (error) {}
  };
  const askCode = async (email) => {
    try {
      const petition = await fetch(
        "http://localhost:4000/zacamil/recoveryPassword/requestCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include", // <-- Esto es CRÍTICO para que las cookies viajen
        }
      );

      const data = await petition.json();

      if (!petition.ok) {
        alert(`Error al enviar correo: ${data.message}`);
        return;
      }

      const input = prompt(
        `Se ha enviado un código al correo ${email}. Verifícalo para continuar.`
      );

      if (!input) return;

      const verifyResponse = await fetch(
        "http://localhost:4000/zacamil/recoveryPassword/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Necesario para enviar cookies al backend
          body: JSON.stringify({ code: input }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        alert(`Error: ${verifyData.message}`);
      } else {
        alert("Codigo verificado exitosamente");
        navigate("/recoverPassword")
      }
    } catch (error) {
      alert(`Error en el proceso de verificación: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Lista de doctores</h1>
      <br></br>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.email}
          doctor={doctor}
          deleteDoctor={() => {
            deleteDoctor(doctor.email);
          }}
          recoverPassword={() => {
            askCode(doctor.email);
          }}
        />
      ))}
    </>
  );
};

export { List };
