import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const SendVerificationEmail = () => {
  const authctx = useContext(AuthContext);

  const sendVerificationEmail = async () => {
    /*if (authctx.token) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4`;
      const requestBody = JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: authctx.token,
      });

      try {
        const response = await fetch(url, {
          method: "POST",
          body: requestBody,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Verification email sent:", data);
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    }*/
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4`;
    fetch(url,{
       method:"POST",
       body:JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: authctx.token,
    }),
    headers:{
        "Content-Type": "application/json"  
    }
    }).then((res)=>res.json())
    .then((data)=>{
        console.log('verification data:',data);
    }).catch((error)=>{ console.log("Error sending verification email:", error)})
  };



  return (
    <div>
      <h2>Send Verification Email</h2>
      <button onClick={sendVerificationEmail}>Send Verification Email</button>
    </div>
  );
};

export default SendVerificationEmail;

