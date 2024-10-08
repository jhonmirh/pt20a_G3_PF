interface AppointmentProps {
  id: string;
  description: string;
  date: string;
  user: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  category: {
    name: string;
    description: string;
  };
}

export default AppointmentProps;