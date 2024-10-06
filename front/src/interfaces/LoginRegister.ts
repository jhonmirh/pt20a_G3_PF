import IProduct from "./Products";

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
    passwordConfirm?:string;
    age: number;
    phone: number;
    address: string;
    city: string;
    admin?: boolean;
}

export type TRegisterError = {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name?: string;
    address?: string;
    phone?: string;
    age?: string;  
    city?:string;
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

export interface userSession {
    token: string;
    userData: {
        id: string;
        name: string;
        email: string;
        age: number;
        password: string;
        phone: string;
        address: string;
        city: string;
        orders: IOrder [];
    }
}