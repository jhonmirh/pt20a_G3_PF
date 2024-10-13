"use client"; // Asegúrate de que esto esté al principio del archivo

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importación correcta
import { useSearchParams } from 'next/navigation'; // Importación de parámetros de búsqueda

const SuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Obtener parámetros de búsqueda
    const session_id = searchParams.get('session_id'); // Obtener session_id de la URL
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const handlePaymentConfirmation = async () => {
            try {
                if (!session_id) {
                    throw new Error("No se encontró el session_id");
                }

                // Llama a tu API para verificar el estado de pago
                const response = await fetch(`/api/payment-status?session_id=${session_id}`);
                const data = await response.json();

                if (data.status === 'paid' && data.appointmentId) {
                    // Almacenar el estado de la cita en localStorage
                    localStorage.setItem(data.appointmentId, JSON.stringify({
                        appointmentId: data.appointmentId,
                        status: 'Pagado'
                    }));

                    console.log('Cita actualizada a Pagado en localStorage');
                    setLoading(false);
                    
                    // Redirigir a citas después de 5 segundos
                    setTimeout(() => {
                        router.push('/appointments');
                    }, 5000);
                } else {
                    throw new Error('El pago no se ha completado o no hay appointmentId');
                }
            } catch (error) {
                const errorMessage = (error as Error).message; // Manejo del error
                console.error('Error:', errorMessage);
                setErrorMessage('Hubo un error actualizando el estado de la cita: ' + errorMessage);
                setLoading(false);
            }
        };

        if (session_id) {
            handlePaymentConfirmation();
        }
    }, [session_id, router]);

    if (loading) {
        return <div>Actualizando el estado de tu cita...</div>;
    }

    return (
        <div>
            {errorMessage ? (
                <div className="error">{errorMessage}</div>
            ) : (
                <div>
                    <h2>¡Pago exitoso!</h2>
                    <p>Su pago ha sido procesado. Será redirigido a sus citas en breve...</p>
                </div>
            )}
        </div>
    );
};

export default SuccessPage;
