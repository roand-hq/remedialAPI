import { useState } from "react";
import { useNavigate } from "react-router";
import "./CSS/changePass-style.css";
const ChangePassword = () => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const navigate = useNavigate();
  const fetchPasswordChange = async (e) => {
    e.preventDefault();
    if (field2 != field1) {
      alert("Las contraseñas no coinciden");
      return;
    }
   
    console.log(field1)
    try {
        const response = await fetch(
            "http://localhost:4000/zacamil/recoveryPassword/newPassword",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newPassword: field1 }),
              credentials: "include", // <-- Esto es CRÍTICO para que las cookies viajen
            }
          );
          const data = await response.json();
          if (!response.ok) {
            alert("Error al cambiar contraseña: " + data.message);
          }
          alert("Contraseña reestablecida exitosamente, regresando al login");
          navigate("/");
    } catch (error) {
        alert("Error al hacer fetch: "+ error)
    }
  };

  return (
    <div className="newPassForm">
      <form onSubmit={fetchPasswordChange}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={field1}
          onChange={(e) => {
            setField1(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={field2}
          onChange={(e) => {
            setField2(e.target.value);
          }}
        />

        <button type="submit">
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};
export { ChangePassword };
