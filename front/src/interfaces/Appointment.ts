import IProduct from "./Products";

export interface IAppointmentData {

  date: string;
  description: string;
  user: string; 
  categoryId: string;
}

///////////////////// EDIT /////////////////
interface UserProps {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}

interface CategoryProps {
  id: string;
  name: string;
}
export default interface AppointmentProps {
  id: string;
  description: string;
  date: string; // or Date if you're working with Date objects
  user: UserProps;
  category: CategoryProps;
}