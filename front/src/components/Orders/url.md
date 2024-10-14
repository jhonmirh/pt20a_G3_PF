const { userData } = useLoggin();

const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
useEffect(() => {
    if (!userData) {
      setModalContent({
        title: "Acceso Denegado",
        message: "Debe estar Logueado para Acceder a Este Espacio",
      });
      setShowModal(true); 
    }
  }, [userData]);


  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login"); 
  };

  if (!userData) {
    return (
      <AlertModal
        showModal={showModal}
        handleClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    );
  }