import React, { useState } from 'react';
import Cart from './Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../utilities/fakedb';


const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemove = (id) =>{
        const remaining = cart.filter(pd => pd.id !== id)
        setCart(remaining);
        removeFromDb(id);
    }
    return (
        <div className="shop-container">
                <div style={{margin:'50px auto' }}>
                  {
                    cart.map((product) => <ReviewItem
                    key={product.id}
                    product={product}
                    handleRemove={handleRemove}
                    ></ReviewItem>)
                  }
                </div>

                <div className="cart">
                    <Cart cart={cart}></Cart>
                </div>
        </div>
    );
};

export default Orders;