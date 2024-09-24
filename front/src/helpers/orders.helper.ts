const APIURL = process.env.NEXT_PUBLIC_API_URL


export async function createOrder(products: number[], token: string) {
    try {
      const res = await fetch(`${APIURL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ products })
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const orders = await res.json();
      return orders;
    } catch (error) {
      console.error("Error in Create Order:", error);
      throw new Error("Error Creating Order");
    }
  }
  

export async function getOrders(token: string) {
    try {
        const res = await fetch(`${APIURL}/users/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
        const order = await res.json();
        return order;
    } catch (error: any) {
        throw new Error(error);
    }
};