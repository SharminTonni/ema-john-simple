import { getShoppingCart } from "./utilities/fakedb";

const cartProductsLoader = async () => {
  // if cart data is in data base or localStorage you have to use async await;

  const storedCart = getShoppingCart();
  console.log(storedCart);

  const ids = Object.keys(storedCart);
  console.log(ids);

  const loadedProducts = await fetch("http://localhost:5000/productsByIds", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  const products = await loadedProducts.json();

  // console.log(storedCart)
  const savedCart = [];
  for (const id in storedCart) {
    const addedProducts = products.find((pd) => pd._id === id);
    if (addedProducts) {
      const quantity = storedCart[id];
      addedProducts.quantity = quantity;
      savedCart.push(addedProducts);
    }
  }

  return savedCart;
};

export { cartProductsLoader };
