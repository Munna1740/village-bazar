import React from 'react';
import Auth from './useAuth';
import './LogIn.css';

const LogIn = () => {
    const auth = Auth();
    const handleSignIn =() =>{
        auth.signInWithGoogle()
        .then(res=>{
            window.location.pathname = '/review';
        });
    }

    const handleSignOut =() =>{
        auth.signOut()
        .then(res=>{
            window.location.pathname = '/';

        });
    }
    return (
        <div className="signInWithGoogle">
            <h1>Please Login</h1>

            {
                auth.user ? <button onClick={handleSignOut}>Sign out</button> :
                <button onClick={handleSignIn}>Sign in with Google</button>
            
            }
        </div>
    );
};

export default LogIn;