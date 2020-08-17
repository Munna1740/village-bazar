import React from 'react';
import { useForm } from 'react-hook-form';
import './Ship.css';
import { useAuth } from '../LogIn/useAuth';

const Ship = () => {
    const { register, handleSubmit,errors } = useForm();
    const onSubmit = data => console.log(data);

    const auth = useAuth();
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
        <input style={{backgroundColor:"#30EF41"}} type="submit" />
      </form>
    );
};

export default Ship;