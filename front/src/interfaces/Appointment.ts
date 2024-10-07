import IProduct from "./Products";

export interface IAppointmentData {
  id: string;
  date: string;
  description: string;
  userId: string; // Asegúrate de que esta propiedad también esté presente
  categoryId: string; // Cambiado de product a categoryId
}
