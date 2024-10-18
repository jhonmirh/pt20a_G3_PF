// pages/api/updateAppointment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { appointmentId, status } = req.body;

    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status },
      });
      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error actualizando la cita:', error);
      res.status(500).json({ error: 'Error actualizando la cita' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
