import React,{useState,useContext} from "react";
import classes from './AuthForm.module.css'
import AuthContext from "../../store/auth-context";

const AuthForm=()=>{
    const[isLogin,setIsLogin]=useState(true)
    const[isLoading,setIsLoading]=useState(false)
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const authctx=useContext(AuthContext);
    const emailHandler=(event)=>{
        setEmail(event.target.value);
    }
    const passHandler=(event)=>{
        setPassword(event.target.value);
    }
    const switchHandler=()=>{
        setIsLogin((prevState)=>!prevState)
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        setIsLoading(true);
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4'
        }
        else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4'
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json',
            }
        }).then((res)=>{
            setIsLoading(false);
            if(res.ok)
            {
                return res.json();
            }
            else{
               return res.json((data)=>{
                let errorMessage='Authentication Failed';
                throw new Error(errorMessage);
               })
            }
        }).then((data)=>{
            authctx.login(data.idToken)
        }).catch((err)=>{
            alert(err.mesaage);
        })
        setEmail('');
        setPassword('');
    }
    return(
        <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label>Your Email</label>
                <input type="text" value={email} onChange={emailHandler} required />
            </div>
            <div className={classes.control}>
                <label>Your Password</label>
                <input type="password" value={password} onChange={passHandler} required />
            </div>
            <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
            {isLoading && <p>is Loading...</p>}
             <button
            type='button'
            className={classes.toggle}
            onClick={switchHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
            </div>

        </form>
        </section>
    )
}
export default AuthForm