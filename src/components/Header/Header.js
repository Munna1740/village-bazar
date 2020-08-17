import React from 'react';
import logo from '../../images/villageBazar.png';
import './Header.css';
import {useAuth} from '../LogIn/useAuth';
import { Link } from 'react-router-dom';



const Header = () => {
    const auth = useAuth();
    console.log(auth.user);

    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory Here</a>
                {
                    auth.user && <span>Welcome {auth.user.name}</span>
                }
                {
                    auth.user ? 
                    <a href="/login">Sign Out</a>:
                    <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;