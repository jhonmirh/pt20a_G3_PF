// components/CheckoutButton.tsx
import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { IAppointmentData } from '@/interfaces/Appointment';
const stripePromise = loadStripe('pk_test_51Q7otE00ffkRUeeSKRpdKrYG7itNG8Q8BlhmsUFHlJLOIPiHwBEZGTGkNqqyPYgn8sbPHXzXJd2WlJ5vDadmhO8p00XCgh3vWY');

const CheckoutButton = ({ appointment }: { appointment: IAppointmentData }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const loadStripeInstance = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };

    loadStripeInstance();
  }, []);

  const handleClick = async () => {
    localStorage.setItem('activeAppointmentId', appointment.id);
    console.log('Proceeding to checkout with appointment ID:', appointment.id);
    console.log('====================================');
    console.log(localStorage);
    console.log('====================================');
    if (!stripe) {
      console.error('Stripe.js no se ha cargado correctamente.');
      return;
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentId: appointment.id,
        description: appointment.description,
        unitAmount: appointment.price * 100,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      return;
    }

    const { sessionId } = data;
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Error redirigiendo a Stripe:', error);
    }
  };


 

  return (
    <button
      onClick={handleClick}
      className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all"
    >
      Pagar
    </button>
  );
};

export default CheckoutButton;
