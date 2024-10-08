import IProduct from "./Products";

export interface IAppointmentData {

  date: string;
  description: string;
  user: string; // Asegúrate de que esta propiedad también esté presente
  categoryId: string; // Cambiado de product a categoryId
}
