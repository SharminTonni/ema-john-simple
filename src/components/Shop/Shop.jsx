import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(response => response.json())
        .then(data => setProducts(data))
    },[]);

    const handleAddToCart =(product)=>{
        const newCart = [...cart, product];

        setCart(newCart);
        addToDb(product.id)
    }


    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        for (const id in storedCart){
            const savedProduct = products.find(product => product.id === id);
            console.log('initial product',savedProduct)
          if(savedProduct){
            const quantity = storedCart[id];
            savedProduct.quantity = quantity;
            savedCart.push(savedProduct);
          }
        }
        setCart(savedCart);
    }, [products])


    return (
        <div className='shop-container'>
            <div className='products-container'>
                
                {
                    products.map(product =><Product
                    product={product}
                    key={product.id}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart">
               <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;