import IProduct from "./Products";

export interface IAppointmentData {
  id: string
  date: string;
  description: string;
  userId: string;
  product: IProduct;
}

