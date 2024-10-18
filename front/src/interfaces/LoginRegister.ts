import IProduct from "./Products";
import { IAppointmentData } from "./Appointment";
export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginError {
    email?: string;
    password?: string | null;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    passwordConfirm?: string;
    age: number;
    phone: number;
    address: string;
    city: string;
    admin?: boolean;
}

// En la interfaz IUsersUpdate
export interface IUsersUpdate {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    phone: number;  // Asegúrate de que sea number
    address: string;
    city: string;
    admin: boolean;
    appointments?: IAppointmentData[];
  }
  

export type TRegisterError = {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name?: string;
    address?: string;
    phone?: string;
    age?: string;
    city?: string;
}


export interface IOrder {
    id: string;
    status: string;
    date: string;
    products: IProduct[];
    user: {
        id: string;
        name: string;
        email: string;
        age: number;
        password: string;
        phone: number;
        address: string;
        city: string;
    };
}

export interface UserSession {
    token: string;
    userData: {
        id: string;
        name: string;
        email: string;
        age: number;
        password: string;
        phone: number; // Cambia a number aquí
        address: string;
        city: string;
        admin: boolean;
    };
}


    
    


export type TCompleteProfileError = {
    address?: string;
    phone?: string;
    age?: string;  
    city?:string;
}

export interface ICompleteProfile {
    age: number;
    phone: number;
    city: string;
    address: string;
}