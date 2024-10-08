
'use client'
import { useEffect, useState } from 'react';
import { getAppointments } from '@/helpers/appointment.helper';
import { useLoggin } from '@/context/logginContext';
import AppointmentProps from './types';

const AppList: React.FC = () => {
  const { userData } = useLoggin();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (userData?.userData.id) {
          const data = await getAppointments(userData.userData.id);
          setAppointments(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userData]);

  if (loading) return <p>Cargando citas...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(appointments);

  return (
    <div className="container mx-auto mt-10">
      
      
      
      <h1 className="text-3xl font-bold mb-5">Tus Citas</h1>
      
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white bg-opacity-80 border border-gray-900 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-3">{appointment.description}</h2>
            <p className="text-gray-700 mb-2">Fecha: {new Date(appointment.date).toLocaleString()}</p>
            <div className="text-gray-700 mb-2">
              <p><strong>Usuario:</strong> {appointment.user.name}</p>
              <p><strong>Teléfono:</strong> {appointment.user.phone}</p>
              <p><strong>Dirección:</strong> {appointment.user.address}, {appointment.user.city}</p>
            </div>
            <div className="text-gray-700">
              <p><strong>Categoría:</strong> {appointment.category.name}</p>
              <p><strong>Descripción de categoría:</strong> {appointment.category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppList;
