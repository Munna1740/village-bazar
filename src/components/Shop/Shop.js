import React, { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart]= useState([]);

    useEffect(()=>{
        fetch('http://localhost:4200/products')
        .then(res=>res.json())
        .then(data =>{
            console.log("Show data",data);
            setProducts(data);
        })
    },[]);

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        
         const productKeys = Object.keys(saveCart);
             if(products.length>0){
                const previousCart = productKeys.map(existingKey =>{
                const product = products.find(pd => pd.key===existingKey);
                product.quantity = saveCart[existingKey];
                return product;
           })
           setCart(previousCart);
   

         }
         
     },[products]);


    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key===product.key);
        let count=1; 
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !==toBeAddedKey);
            newCart = [...others, sameProduct];

        }
        else{
            product.quantity=1;
            newCart = [...cart, product];
        }
        setCart(newCart);  

        addToDatabaseCart(product.key,count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                    {
                        products.map(pd => <Product 
                            key={pd.key}
                            showAddToCart={true}
                            handleAddProduct={handleAddProduct}
                            product={pd}></Product>)
                    }

            </div>
            <div className="cart-container">
                <Cart cart ={cart}>
                    <Link to="/review">
                    <button className="main-btn">Review Order </button>
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Shop;