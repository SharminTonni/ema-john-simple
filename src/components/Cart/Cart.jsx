import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart, handleClearCart, children }) => {
  // console.log(cart);
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    if (product.quantity === 0) {
      product.quantity = 1;
    }
    // product.quantity = product.quantity || 0;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping * product.quantity;
    quantity = quantity + product.quantity;
  }

  const tax = (total * 7) / 100;
  const grandtotal = total + tax + shipping;
  // styles
  const btnClearCart = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px auto",
    width: "90%",
    height: "56px",
    backgroundColor: "#FF3030",
    color: "white",
  };

  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total-Price: {total}</p>
      <p>Shipping: {shipping}</p>
      <p>Tax: {tax.toFixed(2)}</p>
      <h5>Grand-Total: {grandtotal.toFixed(2)}</h5>

      <button onClick={handleClearCart} style={btnClearCart}>
        <span>Clear Cart</span>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>

      {children}
    </div>
  );
};

export default Cart;
