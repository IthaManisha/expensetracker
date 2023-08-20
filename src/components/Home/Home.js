import React,{useState,useContext} from "react";
import UpdateProfile from "./UpdateProfile";
import AuthContext from "../../store/auth-context";
const Home=()=>{
    const[isOpen,setIsOpen]=useState(false);
    const[updateProfile,setUpdateProfile]=useState(false);
    const authctx=useContext(AuthContext)
    const isOpenHandler=()=>{
        setIsOpen((prevState)=>!prevState)
    }
    const logOutHandler = () => {
        authctx.logout();
      }
      console.log(updateProfile);
    return(
        <div>
       <div style={{width: "100%",
       borderBottom: "1px solid #ccc",
       paddingBottom:"20px",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        {!isOpen && <h2 >welcome to home screen</h2>}
        {isOpen && <h2>winners never quite</h2>}
        <div>
           
        {updateProfile && <h4>your profile is 100% complete</h4>}
        {!isOpen && !updateProfile && <h4 style={{fontFamily:'serif'}}>your profile is Incomplete.
        <button style={{color:'blue',border:'none'}} onClick={isOpenHandler}>Complete now</button></h4>}
         {isOpen && !updateProfile && <h4>your profile is 64% complete</h4>}
         <button onClick={logOutHandler}>logout</button>
        </div>
        </div>
        {isOpen && <UpdateProfile  onClose={isOpenHandler} setUpdateProfile={setUpdateProfile}/>}
        
        </div>
    )
}
export default Home;