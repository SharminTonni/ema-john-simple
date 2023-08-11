import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Shop = () => {
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
  const pagination = {
    textAlign: "center",
    marginBottom: "50px",
  };

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData();
  console.log(totalProducts);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const pageNumbers = [...Array(totalPages).keys()];

  //   useEffect(() => {
  //     fetch("http://localhost:5000/products")
  //       .then((response) => response.json())
  //       .then((data) => setProducts(data));
  //   }, []);

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemsPerPage]);
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];

    setCart(newCart);
    addToDb(product._id);
  };

  useEffect(() => {
    const storedCart = getShoppingCart();

    const ids = Object.keys(storedCart);
    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        console.log(cartProducts);
        const savedCart = [];
        for (const id in storedCart) {
          const savedProduct = cartProducts.find(
            (product) => product._id === id
          );

          if (savedProduct) {
            const quantity = storedCart[id];
            savedProduct.quantity = quantity;
            savedCart.push(savedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 15, 20];
  const handleSelect = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <button style={btnProceed}>
                Review Order
                <FontAwesomeIcon
                  style={{ color: "white", fontSize: "25px" }}
                  icon={faArrowRight}
                />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* Pagination */}

      <div style={pagination}>
        <p>
          currentPage: {currentPage} and items Per Page: {itemsPerPage}{" "}
        </p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            // style={{ backgroundColor: "orange" }}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}

        <select name="" value={itemsPerPage} onChange={handleSelect} id="">
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
