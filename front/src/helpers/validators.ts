'use client'
import { ICompleteProfile, ILogin, ILoginError, IRegister, TCompleteProfileError, TRegisterError } from "@/interfaces/LoginRegister";


export function validatePassword(password: string): string | undefined {
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return "El password debe contener al menos un carácter especial, un número, una letra mayúscula y una letra minúscula y tener al menos ocho caracteres.";
    }
    return undefined; 
}

export function validateLogin(values: ILogin): ILoginError {
    const errors: ILoginError = {};
    if (!values.email) {
        errors.email = "Email es Requerido.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address.";
    }
    return errors;
}

export function validateRegisterLogin(values: IRegister): TRegisterError {
    const errors: TRegisterError = {};
    
    if (!values.email) {
        errors.email = "Email es Requerido.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address.";
    }

    if (!values.password) {
        errors.password = "Password es Requerido.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos un carácter especial, un número, una letra mayúscula y una letra minúscula y tener al menos ocho caracteres.";
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = "Password es Requerido.";
    } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Password no Coinciden.";
    }

    if (!values.name) {
        errors.name = "Nombre es Requerido.";
    } else if (!/^[a-zA-Z\s]{3,30}$/.test(values.name)) {
        errors.name = "El nombre debe contener entre 3 y 30 caracteres.";
    }

    if (values.phone === undefined) {
        errors.phone = "Número Telefónico es Requerido.";
    } else if (typeof values.phone !== 'number' || !/^\d{10}$/.test(values.phone.toString())) {
        errors.phone = "El número de teléfono debe ser numérico y tener 10 dígitos.";
    }

    if (values.age === undefined || values.age === null) {
        errors.age = "Edad es Requerido.";
    } else if (typeof values.age !== 'number' || values.age < 18 || values.age > 99 || !/^\d{2}$/.test(values.age.toString())) {
        errors.age = "La edad debe ser un número de dos dígitos mayor o igual a 18";
    }

    if (!values.city) {
        errors.city = "Ciuda es Requerido.";
    } else if (!/^[a-zA-Z]{3,30}$/.test(values.city)) {
        errors.city = "La ciudad debe contener sólo letras y tener entre 3 y 30 caracteres.";
    }

    if (!values.address) {
        errors.address = "Dirección es Requerido.";
    } else if (!/^[a-zA-Z0-9\s\.,_-áéíóúÁÉÍÓÚñÑ]{3,30}$/.test(values.address)) {
        errors.address = "La dirección debe contener entre 3 y 30 caracteres";
    }

    return errors;
}
export function validateCompleteProfile(values: ICompleteProfile): TCompleteProfileError {
    const errors: TCompleteProfileError = {};
    
    if (values.phone === undefined) {
        errors.phone = "Número Telefónico es Requerido.";
    } else if (typeof values.phone !== 'number' || !/^\d{10}$/.test(values.phone.toString())) {
        errors.phone = "El número de teléfono debe ser numérico y tener 10 dígitos.";
    }
    if (values.age === undefined || values.age === null) {
        errors.age = "Edad es Requerido.";
    } else if (typeof values.age !== 'number' || values.age < 18 || values.age > 99 || !/^\d{2}$/.test(values.age.toString())) {
        errors.age = "La edad debe ser un número de dos dígitos mayor o igual a 18";
    }
    if (!values.city) {
        errors.city = "Ciudad es Requerido.";
    } else if (!/^[a-zA-Z]{3,30}$/.test(values.city)) {
        errors.city = "La ciudad debe contener sólo letras y tener entre 3 y 30 caracteres.";
    }
    if (!values.address) {
        errors.address = "Dirección es Requerido.";
    } else if (!/^[a-zA-Z0-9\s\.,_-áéíóúÁÉÍÓÚñÑ]{3,30}$/.test(values.address)) {
        errors.address = "La dirección debe contener entre 3 y 30 caracteres";
    }
    return errors;
}
