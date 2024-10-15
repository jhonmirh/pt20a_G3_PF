"use client"; 

import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggin } from "@/context/logginContext";
import { getOrders } from "@/helpers/orders.helper";
import { IOrder } from "@/interfaces/LoginRegister";
import Card from "../Card/Card";
import AlertModal from "../Alert/AlertModal"; 


const OrdersPage = () => {
  const { userData } = useLoggin();
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!userData) {
      setModalContent({
        title: "Access Denied",
        message: "You must be logged in to view your Orders",
      });
      setShowModal(true); 
    }
  }, [userData]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login"); 
  };

  const fetchData = useCallback(async () => {
    if (!userData?.token) {
      return;
    }

    try {
      const ordersData = await getOrders(userData.token);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      fetchData();
    }
  }, [fetchData, userData]);


  if (!userData) {
    return (
      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700 p-4 w-full"
            >
              <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
              <p className="text-gray-700 dark:text-gray-200">
                Order Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Status: {order.status}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Products:</h3>
                <div className="flex flex-wrap gap-4">
                  {order.products.length > 0 ? (
                    order.products.map((product) => (
                      <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                        <Card {...product} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 dark:text-gray-200">No products found</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="m-10 p-2 max-w-80 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-800 dark:bg-gray-800 dark:border-gray-700">
            <h1>No Tienes Citas Atendidas</h1>
          </div>
        )}
      </div>

      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default OrdersPage;
