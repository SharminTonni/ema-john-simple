import { getShoppingCart } from "./utilities/fakedb";

const cartProductsLoader = async ()=>{
    const loadedProducts = await fetch ('products.json')
    const products = await loadedProducts.json();

    // if cart data is in data base or localStorage you have to use async await;

    const storedCart = getShoppingCart();
    // console.log(storedCart)
    const savedCart =[];
    for(const id in storedCart){
        const addedProducts = products.find(pd => pd.id === id);
        if(addedProducts){
            const quantity = storedCart[id];
            addedProducts.quantity = quantity;
            savedCart.push(addedProducts);

        }
    }


    return savedCart;
}

export {cartProductsLoader}