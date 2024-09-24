import { ILogin, ILoginError, IRegister, TRegisterError } from "@/interfaces/LoginRegister";

export function validatePassword(password: string): string | undefined {
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return "The password must contain at least one special character, one number, one uppercase letter and one lowercase letter, and be at least eight characters long.";
    }
    return undefined; // Devuelve undefined si no hay error
}

export function validateLogin(values: ILogin): ILoginError {
    const errors: ILoginError = {};

    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address.";
    }

    return errors;
}

   export function validateRegisterLogin(values: IRegister): TRegisterError {
      
      const errors: TRegisterError = {};
      
      if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = "Invalid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(values.password)) {
    errors.password = "The password must contain at least one special character, one number, one uppercase letter and one lowercase letter, and be at least eight characters long.";
  }

  if (!values.passwordConfirm) {
    errors.password = "Password is required.";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(values.password)) {
    errors.password = "The password must contain at least one special character, one number, one uppercase letter and one lowercase letter, and be at least eight characters long.";
  }

  if (!values.name) {
    errors.name = "Name is required.";
  } else if (!/^[a-zA-Z]{3,30}$/.test(values.name)) {
    errors.name = "Name must contain between 3 to 30 characters";
  }

  if (!values.address) {
    errors.address = "Address is required.";
  } else if (!/^.{10,30}$/.test(values.address)) {
    errors.address = "Address must contain between 10 to 30 characters";
  }

  if (values.phone === undefined) {
    errors.phone = "Phone number is required.";
} else if (typeof values.phone !== 'number' || !/^\d{10}$/.test(values.phone.toString())) {
    errors.phone = "Phone number must be numeric and 10 digits long.";
}

if (values.age === undefined || values.age === null) {
  errors.age = "Age is required.";
} else if (typeof values.age !== 'number' || values.age < 18 || values.age > 99 || !/^\d{2}$/.test(values.age.toString())) {
  errors.age = "Age must be a two-digit number greater than or equal to 18.";
}

if (!values.city) {
  errors.city = "City is required.";
} else if (!/^[a-zA-Z]{3,30}$/.test(values.city)) {
  errors.city = "City must contain only letters and be between 3 to 30 characters.";
}

if (!values.address) {
  errors.address = "Address is required.";
} else if (!/^[a-zA-Z]{3,30}$/.test(values.address)) {
  errors.address = "Address must contain between 3 to 30 characters";
}

  return errors;

}