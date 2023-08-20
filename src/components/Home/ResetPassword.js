import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from '../Auth/AuthForm.module.css';

const ResetPassword = () => {
    const authctx = useContext(AuthContext);

    const resetPassword = () => {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4";
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: authctx.email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Email data:", data);
        })
        .catch((error) => {
            console.log("Error sending password reset:", error);
        });
    };

    return (
        <>
            <button className={classes.toggle} onClick={resetPassword}>Forgot password</button>
        </>
    );
};

export default ResetPassword;
