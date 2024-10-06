"use client";
import { useEffect, useState } from "react";
import { useLoggin } from "@/context/logginContext";
import { getUserAppointments, cancelAppointment } from "@/helpers/appointment.helper";
import Link from "next/link";

interface Appointment {
  id: string;
  date: string; 
  description: string;
}

export const UserAppointments: React.FC = () => {
  const { userData } = useLoggin();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (userData?.userData?.id) { 
        const result = await getUserAppointments(userData.userData.id);
        setAppointments(result);
      }
    };
    fetchAppointments();
  }, [userData]);

  const handleCancel = async (appointmentId: string) => {
    await cancelAppointment(appointmentId);
    setAppointments(appointments.filter(app => app.id !== appointmentId));
  };

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <p>{appointment.date} - {appointment.description}</p>
              <Link href={`/appointment/edit/${appointment.id}`}>Edit</Link>
              <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found</p>
      )}
    </div>
  );
};
