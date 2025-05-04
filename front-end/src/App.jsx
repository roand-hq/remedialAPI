import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Register } from "./pages/Register";
import { List } from "./pages/List";
import { Login } from "./pages/Login";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [doctors, setDoctors] = useState([]);
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:4000/zacamil/doctors"); // Asegúrate de usar await aquí
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register setDoctors={setDoctors} />} />
        <Route path="/list" element={<List doctors={doctors} getDoctors={fetchDoctors}/>} />
      </Routes>
    </Router>
  );
}

export default App;
