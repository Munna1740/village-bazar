import React from 'react';
import { useForm } from 'react-hook-form';
import './Ship.css';
import { useAuth } from '../LogIn/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Ship = () => {
    const { register, handleSubmit,errors } = useForm();
    const auth = useAuth();
    const onSubmit = data =>{ 
      //TODO :Munna move this after payment....
      const saveCart = getDatabaseCart();
      const orderDetail = {email : auth.user.email, cart:saveCart}
        fetch('http://localhost:4200/placeOrder',{
                method:'POST',
                body:JSON.stringify(orderDetail),
                headers: {
                   "Content-type": "application/json; charset=UTF-8"
                }

      })
      .then(res =>res.json())
      .then(data =>{
        console.log("Order placed successful");
        alert("Successfully placed the order with order ID: " + data._id);
        processOrder();

      })

    }
    return (
      <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
        {
            errors.name && <span className="error">Name is required</span>
        }
        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
        {
            errors.email && <span className="error">Email is required</span>
        }
        <input phone="phone" ref={register({ required: true })} placeholder="Phone Number" />
        {errors.phone && <span className="error">Phone number is required</span>}
        <input name="address" ref={register({ required: true })} placeholder="Address" />
        {errors.address && <span className="error">Address is required</span>}
        <input name="city" ref={register({ required: true })} placeholder="City" />
        {errors.city && <span className="error">City name is required</span>}
        <input name="zip" ref={register({ required: true })} placeholder="Zip code" />
        {errors.zip && <span className="error">Zip code is required</span>}
        <input name="country" ref={register({ required: true })} placeholder="Country" />
        {errors.country && <span className="error">Country is required</span>}
        <input style={{backgroundColor:"#27CF36"}} type="submit" />
      </form>
    );
};

export default Ship;