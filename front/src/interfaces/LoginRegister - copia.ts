export interface ILogin {
    email: string;
    password: string
}

export interface ILoginError {
    email?: string;
    password?: string
}

export interface IRegister {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
}

export type TRegisterError = Partial<IRegister>;

export interface userSession {
    token: string;
    userData: {
        id: number;
        address: string;
        name: string;
        email: string;
        phone: string;
        city:string;
        ordes:[]
    }
}