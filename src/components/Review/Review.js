import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';

const Review = () => {
    const [cart,setCart]= useState([]);
    const auth =useAuth();
    
    const handleRemoveProduct = (proudctkey)=>{
        const newCart = cart.filter(pd => pd.key !== proudctkey);
        setCart(newCart);
        removeFromDatabaseCart(proudctkey);
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        console.log(productKeys);

        fetch('http://localhost:4200/getProductByKey',{
                method:'POST',
                body:JSON.stringify(productKeys),
                headers: {
                   "Content-type": "application/json; charset=UTF-8"
                }

        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            const cartProducts = productKeys.map(key => {
            const product = data.find(pd => pd.key===key);
            product.quantity = saveCart[key];
            return product;

        });
        setCart(cartProducts);

        })

    },[]);

    return (
        <div className="twin-container">
            <div className = "product-container">
            {
                cart.map(prd => <ReviewItem
                    handleRemoveProduct ={handleRemoveProduct}
                    key={prd.key}
                    product={prd}></ReviewItem>)
            }
            {
                !cart.length && <h1 style={{textAlign:"center"}}>Your cart is empty.<a href='/shop'> Keep shopping</a> :) </h1>
            }

            </div>
            <div className ="cart-container">
                <Cart cart={cart}>
                   <Link to="ship">
                  {
                   auth.user ?
                   <button className="main-btn">Proceed Checkout</button> :
                   <button className="main-btn">Login to Proceed</button>
                  
                  }
                   </Link>
                </Cart>

            </div>
            
        </div>
    );
};

export default Review;