import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    console.log(cart);
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart) { 
        if(product.quantity === 0){
            product.quantity = 1;
        }
        // product.quantity = product.quantity || 0;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity;
    }

    const tax = total * 7 / 100;
    const grandtotal = total + tax + shipping;

    return (
        <div className="cart">
             <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total-Price: {total}</p>
            <p>Shipping: {shipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h5>Grand-Total: {grandtotal.toFixed(2)}</h5>
        </div>
    );
};

export default Cart;