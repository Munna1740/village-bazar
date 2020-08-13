import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart,setCart]= useState([]);
    const [orderPlaced,setOrderPlaced]= useState(false);


    const handlePlaceOrder=()=> {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }


    const handleRemoveProduct = (proudctkey)=>{
        const newCart = cart.filter(pd => pd.key !== proudctkey);
        setCart(newCart);
        removeFromDatabaseCart(proudctkey);
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key===key);
            product.quantity = saveCart[key];
            return product;

        });
        setCart(cartProducts);

    },[]);

    let thankU;
    if(orderPlaced){
        thankU = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className = "product-container">
            {
                cart.map(prd => <ReviewItem
                    handleRemoveProduct ={handleRemoveProduct}
                    key={prd.key}
                    product={prd}></ReviewItem>)
            }
            {thankU}

            </div>
            <div className ="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
                </Cart>

            </div>
            
        </div>
    );
};

export default Review;