const { userData } = useLoggin();

const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });


 useEffect(() => {
    if (!userData?.token) {
      setModalContent({
        title: "Acceso Denegado",
        message: "Debe estar Logueado para Acceder a Este Espacio",
      });
      setShowModal(true);
      console.log("Mostrando Modal: ", showModal); // Agregar para verificar el valor
    }
  }, [userData, showModal]);


  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login"); 
  };

  {alertModalOpen && (
        <AlertModal
          showModal={alertModalOpen}
          handleClose={() => setAlertModalOpen(false)}
          title="No hay citas"
          message="El usuario no posee citas registradas."
        />
      )}
  