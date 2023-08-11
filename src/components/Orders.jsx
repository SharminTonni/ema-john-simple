import React, { useState } from "react";
import Cart from "./Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const btnProceed = {
    backgroundColor: "#FF9900",
    borderRadius: "4px",
    width: "90%",
    margin: "10px auto",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleRemove = (id) => {
    const remaining = cart.filter((pd) => pd._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div style={{ margin: "50px auto" }}>
        {cart.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleRemove={handleRemove}
          ></ReviewItem>
        ))}
      </div>

      <div className="cart">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link style={{ textDecoration: "none" }} to="/checkout">
            <button style={btnProceed}>
              CheckOut
              <FontAwesomeIcon
                style={{ color: "white", fontSize: "25px" }}
                icon={faCalendarCheck}
              />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
