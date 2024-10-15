// pages/completar-perfil.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TCompleteProfileError } from '@/interfaces/LoginRegister';
import { useLoggin } from '@/context/logginContext';
import { validateCompleteProfile } from '@/helpers/validate';


const CompleteProfile: React.FC = () => {
    const { setUserData } = useLoggin();
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

    // Valida los campos en tiempo real
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
        <h1 className="text-3xl font-bold text-gray-900 shadow-gray-900/50 shadow-md mb-4">
            Completa tu perfil en Soluciones JhonDay Servicios Tenológicos
        </h1>
    </div>
    <form onSubmit={handleSubmit}>

    <div className="mb-5">
            <label
            htmlFor="age  "
            className="block mb-2 text-sm font-bold text-green-900 dark:text-white"
            >
            Edad
            </label>
            <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => handleFieldChange('age', e.target.valueAsNumber)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus :ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sólo números mayores que 18"
            required
            />
            {error.age && <span className="text-red-600">{error.age}</span>}
        </div>

        <div className="mb-5">
            <label
            htmlFor="phone"
            className="block mb-2 text-sm font-bold text-green-900 dark:text-white"
            >
            Teléfono de Contacto
            </label>
            <input
            type="number"
            id="phone"
            name="phone"
            value={phone || ""}
            onChange={(e) => handleFieldChange('phone', e.target.valueAsNumber)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Only number 10 Characters"
            required
            />
            {error.phone && <span className="text-red-600">{error.phone}</span>}
        </div>

        <div className="mb-5">
            <label
            htmlFor="city"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
        >
            Ciudad
        </label>
            <input
            type="text"
            id="city"
            name="city"
            value={city || ""}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="En que Ciudad Vives"
            required
        />
            {error.city && <span className="text-red-600">{error.city}</span>}
        </div>

        <div className="mb-5">
            <label
            htmlFor="address"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
            Dirección
            </label>
            <input
            type="text"
            id="address"
            name="address"
            value={address || ""}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tu Dirección Completa Estado Calle Carrera  ..."
            required
            />
            {error.address && (
            <span className="text-red-600">{error.address}</span>
            )}
        </div>

        <button type="submit">Guardar</button>
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
