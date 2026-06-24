import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContxtProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setcartItems] = useState({});
  const [product, setProduct] = useState([]);

  // Auth States
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const navigate = useNavigate();

  // Check auth status from backend
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/me`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Logout user (clears backend cookies and local state)
  const logoutUser = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuthenticated(false);
      setcartItems({});
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };


  // ===============================
  // ADD TO CART
  // ===============================
  const addToCard = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setcartItems(cartData);

    try {
      await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ===============================
  // CART COUNT
  // ===============================
  const getCardCount = () => {
    let count = 0;

    for (let items in cartItems) {
      for (let size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          count += cartItems[items][size];
        }
      }
    }

    return count;
  };

  // ===============================
  // UPDATE QUANTITY
  // ===============================
  const updatequantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setcartItems(cartData);

    try {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ===============================
  // TOTAL CART AMOUNT
  // ===============================
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = product.find((pro) => pro._id === items);

      if (!itemInfo) continue;

      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalAmount += itemInfo.price * cartItems[items][size];
        }
      }
    }

    return totalAmount;
  };

  // ===============================
  // GET USER CART (FROM COOKIE AUTH)
  // ===============================
  const getUserCard = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/cart/get`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setcartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ===============================
  // GET ALL PRODUCTS
  // ===============================
  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list`
      );

      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ===============================
  // INIT PRODUCTS
  // ===============================
  useEffect(() => {
    getAllProduct();
  }, []);

  // ===============================
  // AUTH CHECK ON MOUNT
  // ===============================
  useEffect(() => {
    checkAuth();
  }, []);

  // ===============================
  // LOAD USER CART (COOKIE BASED)
  // ===============================
  useEffect(() => {
    if (isAuthenticated) {
      getUserCard();
    } else {
      setcartItems({});
    }
  }, [isAuthenticated]);

  // ===============================
  // CONTEXT VALUE
  // ===============================
  const value = {
    product,
    currency: "₹",
    delivery_fee: 10,

    search,
    setSearch,
    showSearch,
    setShowSearch,

    cartItems,
    addToCard,
    getCardCount,
    updatequantity,
    getCartAmount,

    navigate,

    setcartItems,
    backendUrl,

    // Auth exports
    user,
    isAuthenticated,
    isAuthLoading,
    checkAuth,
    logoutUser,
    token: isAuthenticated ? "cookie-session" : "",
    setToken: () => {},
  };


  return (
    <shopContext.Provider value={value}>
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopContxtProvider;