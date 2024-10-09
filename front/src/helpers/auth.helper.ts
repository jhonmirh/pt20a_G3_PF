import { ILogin, IRegister } from "@/interfaces/LoginRegister"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(userData: IRegister) {
  try {
      const res = await fetch(`http://localhost:3010/users/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });

      if (!res.ok) {
          const errorData = await res.json(); 
          throw new Error(errorData.message || 'Falla en Registro');
      }

     
      return await res.json();
  } catch (error: any) {
     
      console.error('Error en el registro:', error.message);
      throw new Error(error.message || 'Error desconocido'); 
  }
}

export async function loginUser(userData: ILogin) {
    try {
        const res = await fetch(`http://localhost:3010/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Falla en Autenticación');
        }

        return await res.json();
    } catch (error: any) {
        console.error('Error during login:', error);
        throw new Error(error.message || 'Error en el proceso de login');
    }
}
// Esta función envía el token de Google a tu backend para validar y obtener un JWT
export const loginWithGoogle = async (googleToken: string) => {
    try{
        const response = await fetch('http://localhost:3010/auth/google-login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                token: googleToken,
        }),
    });

if (!response.ok) {
    const errorData = await response.json(); 
    throw new Error(`Error: ${errorData.message || response.statusText}`);
}
const data = await response.json();
return data; // Debe devolver el usuario y el JWT
}catch(error) {
console.error('Error al iniciar sesión con Google:', error);

}
};