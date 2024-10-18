// pages/completar-perfil.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TCompleteProfileError } from '@/interfaces/LoginRegister';
import { useLoggin } from '@/context/logginContext';
import { validateCompleteProfile } from '@/helpers/validate';


const CompleteProfile: React.FC = () => {
    const { userData, setUserData } = useLoggin();
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [error, setError] = useState<TCompleteProfileError>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const router = useRouter();    


    const handleFieldChange = (field: keyof TCompleteProfileError, value: any) => {
        let updatedValue = { age, phone, address, city };
        
        if (field === 'age') {
            updatedValue.age = value;
            setAge(value);
        } else if (field === 'phone') {
            updatedValue.phone = value;
            setPhone(value);
        } else if (field === 'address') {
            updatedValue.address = value;
            setAddress(value);
        } else if (field === 'city') {
            updatedValue.city = value;
            setCity(value);
        }

        // Realiza las validaciones con el valor actualizado
        const validationErrors = validateCompleteProfile(updatedValue);
        setError(validationErrors);

        // Actualiza los errores solo para el campo actual
    const updatedErrors = { ...error };
    if (validationErrors[field]) {
        updatedErrors[field] = validationErrors[field];
    } else {
        delete updatedErrors[field];
    }

        
        setError(updatedErrors);
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
    

        const validationErrors = validateCompleteProfile({ age, phone, address, city });
        setError(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) {
            return; // Si hay errores, se detiene aquí
        }


        const sessionData = JSON.parse(localStorage.getItem('sessionStart') || '{}');
        const token = sessionData.token;
        console.log("token utilizado en el front", token);
    
        if (!token) {
            setErrorMessage('No se encontró un token. Por favor, inicia sesión.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3010/auth/update-profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ age, phone, address, city }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
                    
                const updatedUserData = await response.json();
                console.log("updatedUserData", updatedUserData)
                setUserData({
                    token,
                    userData: updatedUserData
                });
                setSuccessMessage('Perfil completado con éxito');
                setIsProfileUpdated(true); // Activa el efecto para redirigir
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            setErrorMessage('Hubo un error al actualizar el perfil.');
        }
    };
    
    useEffect(() => {
        if (isProfileUpdated) {
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        }
        console.log("isProfiledUpdate", isProfileUpdated)
    }, [isProfileUpdated]);


    return (
        <div className="flex flex-col items-center justify-center w-full">
        <div className="text-center text-green-900 font-bold mt-5 mb-5">
        <div className="relative mb-1">
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg shadow-lg shadow-gray-900 z-0"></div>
        <h1 className="text-3xl font-bold text-gray-900 relative z-10">
            Completa tu perfil 
        </h1>
        </div>
    </div>
    <form onSubmit={handleSubmit} 
    className="w-full max-w-lg mb-3 rounded-md mx-auto shadow-lg border border-gray-900 bg-white bg-opacity-85 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:max-w-md sm:max-w-sm"
    >
    <div className="mb-5">
            <label
            htmlFor="age  "
            className="block mb-2 text-sm font-bold text-gray-900"
            >
            Edad
            </label>
            <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => handleFieldChange('age', e.target.valueAsNumber)}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.age ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Sólo números mayores que 18"
            required
            />
            {error.age && (
            <span className="text-red-600">{error.age}</span>
            )}
        </div>

        <div className="mb-5">
            <label
            htmlFor="phone"
            className="block mb-2 text-sm font-bold text-gray-900"
            >
            Teléfono 
            </label>
            <input
            type="number"
            id="phone"
            name="phone"
            value={phone || ""}
            onChange={(e) => handleFieldChange('phone', e.target.valueAsNumber)}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ingresar 10 caracteres"
            required
            />
                {error.phone && (
            <span className="text-red-600">{error.phone}</span>
            )}
        </div>

        <div className="mb-5">
            <label
            htmlFor="city"
            className="block mb-2 text-sm font-bold text-gray-900"
        >
            Ciudad
        </label>
            <input
            type="text"
            id="city"
            name="city"
            value={city || ""}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.city ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="En qué ciudad vives"
            required
        />
            {error.city && (
            <span className="text-red-600">{error.city}</span>
            )}
        </div>

        <div className="mb-5">
            <label
            htmlFor="address"
            className="block mb-2 text-sm font-bold text-gray-900"
            >
            Dirección
            </label>
            <input
            type="text"
            id="address"
            name="address"
            value={address || ""}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.address ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tu dirección completa Estado Calle Carrera..."
            required
            />
            {error.address && (
            <span className="text-red-600">{error.address}</span>
            )}
        </div>

        <div className="flex flex-col items-center justify-center ">   
        <button 
        type="submit"
        className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
            Guardar
            </button>
            </div>
    </form>
    {successMessage && (
                <p className="text-green-600 mt-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-600 mt-4">{errorMessage}</p>
            )}
    </div>
    );
};

export default CompleteProfile;
