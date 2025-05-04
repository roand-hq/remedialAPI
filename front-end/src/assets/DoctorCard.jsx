const DoctorCard = ({ doctor, deleteDoctor, recoverPassword }) => {
  if (!doctor) {
    return <div>Cargando...</div>; // Mensaje de carga si el doctor no está disponible
  }


  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: "24rem" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">{doctor.name}</h5>
        <p className="card-text mb-1">
          <strong>Especialidad:</strong> {doctor.specialty}
        </p>
        <p className="card-text mb-3">
          <strong>Email:</strong> {doctor.email}
        </p>
        <button
          className="btn btn-danger me-2"
          onClick={deleteDoctor}
        >
          Eliminar
        </button>
        <button
          className="btn btn-primary"
          onClick={ recoverPassword}
        >
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
};
export { DoctorCard };
