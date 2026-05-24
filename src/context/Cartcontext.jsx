import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartcontextProvider = ({ children }) => {
  // ✅ Read from localStorage on first load
  const [cart, setcart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  // ✅ Save to localStorage every time cart changes
  const updateCart = (newCart) => {
    setcart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

const addToCart = (product) => {
  setcart((prev) => {
    const exists = prev.find((item) => item._id === product._id);

    const newCart = exists
      ? prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...prev, { ...product, quantity: 1 }];

    toast.success("Product added successfully");

    localStorage.setItem("cart", JSON.stringify(newCart));

    return newCart;
  });
};

  const removeFromCart = (id) => {
    setcart((prev) => {
      const newCart = prev.filter((item) => item._id !== id);
       toast.success("product deleted sucessfully")
      localStorage.setItem("cart", JSON.stringify(newCart)); // ✅ save
      return newCart;
    });
  };

  const clearCart = () => {
    setcart([]);
    toast.success(" All Product remove successfully");
    
    localStorage.removeItem("cart"); // ✅ clear
  };
  // for increasequentity
 const increaseQty = (id) => {
  setcart((prev) => {
    const newCart = prev.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    localStorage.setItem("cart", JSON.stringify(newCart))
    return newCart
  })
}
// for decrease
const decreaseQty = (id) => {
  setcart((prev) => {
    const newCart = prev
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)  // ✅ remove if quantity hits 0
     
    localStorage.setItem("cart", JSON.stringify(newCart))
    return newCart
  })
}

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
