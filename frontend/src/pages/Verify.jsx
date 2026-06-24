import React, { useContext, useEffect } from 'react'
import {shopContext} from "../context/ShopContext"
import {  useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Verify = () => {
  const { isAuthenticated, isAuthLoading, navigate, setcartItems, backendUrl } = useContext(shopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderid = searchParams.get('orderId');
  const verifyPayment = async() =>{

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStrip`,
        { success, orderid },
        { withCredentials: true }
      );
 
      if(response.data.success){
        setcartItems({});
        navigate("/orders")
      } else{
         navigate("/cart")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthenticated) {
        verifyPayment();
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, isAuthLoading]);
  
  
 
  return (
    <div>Verify</div>
  )
}

export default Verify