import React,{useState} from "react";
 const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    email:'',
    login:(token,email)=>{},
    logout:()=>{}
 })

 export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const[token,setToken]=useState(initialToken)
    const initialEmail=localStorage.getItem('email')
    const[email,setEmail]=useState(initialEmail)

    let userLoggedIn=!!token
    const loginHandler=(token,email)=>{
     setToken(token);
     setEmail(email);
     localStorage.setItem('token',token);
     localStorage.setItem('email',email)
    }
    const logoutHandler=()=>{
     setToken(null)
     localStorage.removeItem('token')
     localStorage.removeItem('email')
    }

    const contextValue={
        token:token,
        email:email,
        isLoggedIn:userLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
 }
 export default AuthContext;