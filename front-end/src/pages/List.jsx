import { useEffect, useState } from "react"
import { DoctorCard } from "../assets/DoctorCard"
const List = ({doctors, getDoctors}) => {
    useEffect(() => {
        getDoctors()
    }, [])

    const deleteDoctor = async (email) => {
        try {
            let goingToDelete = {
                email: email
            }
            const response = await fetch(`http://localhost:4000/zacamil/doctors/${email}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(goingToDelete)
            })
            if(!response.ok) throw new Error("Network response was not ok")
                getDoctors()
        } catch (error) {
            
        }
    }
    return(
        <>
            <h1>Lista de doctores</h1>
            <br></br>
            {
                doctors.map((doctor) => (
                    //aqui le pasamos el update employee a la card
                      <DoctorCard key={doctor.email} doctor={doctor} deleteDoctor={() => {deleteDoctor(doctor.email)}}/>
                  ))
            }
        </>
    )

}

export {List}