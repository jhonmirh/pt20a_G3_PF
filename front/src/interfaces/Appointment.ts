// interfaces/User.ts
export interface UserProps {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}

// interfaces/Category.ts
export interface CategoryProps {
  id: string;
  name: string;
}


export interface IAppointmentData {
  id: string;
  date: string;
  description: string;
  price:number;
  user: UserProps; // Ahora es un objeto de tipo UserProps
  categoryId: string;
}

// interfaces/Appointment.ts


export default interface AppointmentProps {
  id: string;
  description: string;
  date: string;
  price:number;
  user: UserProps; // También aquí debería ser un objeto UserProps
  category: CategoryProps;
  categoryId: string;
}
