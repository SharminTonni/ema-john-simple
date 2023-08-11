import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleRemove }) => {
  const orderContainer = {
    width: "570px",
    border: "1px solid #95A0A7",
    borderRadius: "8px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 25px 8px 8px",
  };
  const imgStyle = {
    width: "91px",
    height: "91px",
    padding: "8px",
    borderRadius: "6px",
  };

  const reviewDetails = {
    flexGrow: "1",
  };

  const productTitle = {
    fontWeight: "400",
    fontSize: "21px",
    lineHeight: "25px",
    letterSpacing: "0.0015em",
    margin: "0px 15px",
  };

  const orange = {
    color: "#FF9900",
  };

  const btnDelete = {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    backgroundColor: "rgba(235, 87,87,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const { _id, name, price, img, quantity } = product;
  return (
    <div style={orderContainer}>
      <img style={imgStyle} src={img} alt="" />
      <div style={reviewDetails}>
        <h5 style={productTitle}>{name}</h5>
        <p style={{ margin: "0px 15px" }}>
          Price: <span>${price}</span>
        </p>
        <p style={{ margin: "0px 15px" }}>
          Order Quantity: <span>{quantity}</span>
        </p>
      </div>

      <button onClick={() => handleRemove(_id)} style={btnDelete}>
        <FontAwesomeIcon
          style={{ color: "#EB5757", fontSize: "25px" }}
          icon={faTrashAlt}
        />
      </button>
    </div>
  );
};

export default ReviewItem;
