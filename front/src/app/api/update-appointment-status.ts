// pages/api/update-appointment-status.ts
import { NextApiRequest, NextApiResponse } from 'next';
// Imagina que tienes un método para actualizar tu DB
import { updateAppointmentStatus } from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { appointmentId, status } = req.body;

  try {
    // Actualizar el estado de la cita en tu base de datos
    await updateAppointmentStatus(appointmentId, status);
    res.status(200).json({ message: 'Appointment status updated' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Error updating appointment' });
  }
}
