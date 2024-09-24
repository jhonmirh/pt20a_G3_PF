"use client";

import React, { useEffect, useState } from "react";
import { createOrder } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Products";
import Card from "../Card/Card";
import AlertModal from "../Alert/AlertModal";
import SignOutConfirmation from "../SignOutConfirmation/SignOutConfirmation";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { userData, setUserData } = useLoggin();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const [modalContentDenied, setModalContentDenied] = useState({
    title: "",
    message: "",
  });
  const [isModalOpenDenied, setIsModalOpenDenied] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );


  useEffect(() => {
    if (!userData) {
      setModalContentDenied({
        title: "Access Denied",
        message: "You must be logged in to view your Quotes",
      });
      setIsModalOpenDenied(true);
    } else {
      const cartProducts: IProduct[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      if (cartProducts.length > 0) {
        const total = cartProducts.reduce((sum, product) => sum + product.price, 0);
        setTotal(total);
        setCart(cartProducts);
      }
    }
  }, [userData]); 

  const handleCloseModalDenied = () => {
    setIsModalOpenDenied(false);
    router.push("/login");
  };

  if (!userData) {
    return (
      <AlertModal
        show={isModalOpenDenied}
        onClose={handleCloseModalDenied}
        title={modalContentDenied.title}
        message={modalContentDenied.message}
      />
    );
  }

  const handleLinkClick = async () => {
    if (!userData?.token) {
      alert("You do not have an active session");
      return;
    }

    const idproducts = cart.map((product) => product.id);
    try {
      const response = await createOrder(idproducts, userData.token);
      setModalContent({
        title: "JHONDAY REPORTS",
        message: "SUCCESSFUL PURCHASE CONGRATULATIONS",
      });
      setShowModal(true);
      setCart([]);
      setTotal(0);
      localStorage.setItem("cart", "[]");
    } catch (error) {
      console.error("Error during checkout:", error);
      setModalContent({
        title: "JHONDAY ALERT IN YOUR PURCHASE",
        message: "THERE WAS AN ERROR IN THE PURCHASE PROCESS",
      });
      setShowModal(true);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = "/cart";
  };

  const confirmSignOut = () => {
    if (selectedProductId === null) return;
    const updatedCart = cart.filter(
      (product) => product.id !== selectedProductId
    );
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, product) => sum + product.price, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline p-4 gap-4 justify-center">
        {cart && cart.length > 0 ? (
          cart.map((product: IProduct) => (
            <div key={product.id} className="relative">
              <Card {...product} />
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="m-10 p-2 max-w-80 bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
            <h1>NO TIENE ARTICULOS EN SU CARRITO</h1>
          </div>
        )}
        {cart && cart.length > 0 && (
          <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
            <div className="mb-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                Total: ${total.toFixed(2)}
              </h2>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLinkClick}
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <SignOutConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSignOut}
        title="Remove Product Added to Cart"
        message="Are you sure you want to remove this product from the cart?"
      />

      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default CartPage;
