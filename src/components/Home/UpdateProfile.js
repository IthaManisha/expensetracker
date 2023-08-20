import React,{useState,useContext,useEffect} from "react";
import AuthContext from "../../store/auth-context";
import SendVerificationEmail from "./SendVerificationEmail";

const UpdateProfile=(props)=>{
    const[fullName,setFullName]=useState('');
    const[profileUrl,setProfileUrl]=useState('');
    
    
    const authctx=useContext(AuthContext);
    const nameHandler=(event)=>{
        setFullName(event.target.value)
    }
    const profileUrlHandler=(event)=>{
        setProfileUrl(event.target.value)
    }

    console.log('token is:',authctx.token)
    useEffect(() => {
        fetchUserProfile(); // Call fetchUserProfile when the component mounts
      }, []);
    const fetchUserProfile = async () => {
        try {
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: authctx.token,
            }),
          });
    
          const data = await response.json();
          if (data.users && data.users.length > 0) {
            const user = data.users[0];
            setFullName(user.displayName || ''); // Fill the display name if available
            setProfileUrl(user.photoUrl || ''); // Fill the photo URL if available
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
    const handleSubmit=(event)=>{
        event.preventDefault();
        let Url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4'
        fetch(Url,{
            method:'POST',
            body:JSON.stringify({
                idToken:authctx.token,
                displayName:fullName,
                photoUrl:profileUrl,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response)=>response.json())
            .then((data)=>{
            console.log(data);
            props.setUpdateProfile(true);
            setFullName('')
            setProfileUrl('')
            //fetchUserProfile()
            props.onClose()
            
        }).catch((err)=>{
            console.log("Error Message is:",err);
        })
       
    }
    return(
        <div style={{marginLeft:'50%',width: "100%",
        borderBottom: "1px solid #ccc",
        paddingBottom:"20px",borderColor:'black'}}>
        <h2>Contact Details</h2>
        <form>
            <label style={{marginRight:'20px'}}>Full Name</label>
            <input type="text" size="50" value={fullName} onChange={nameHandler} /><br />
            <label style={{marginRight:'20px'}}>profile URL photo</label>
            <input type="text" size="50" value={profileUrl} onChange={profileUrlHandler}/><br/>
            <div style={{marginLeft:'20px',marginTop:'20px'}}>
            <button onClick={props.onClose} style={{padding:'12px',borderRadius:'8px',color:'red',borderColor:'red',background:'white'}}>close</button>
            <button 
              style={{marginLeft:'20px',padding:'12px',borderRadius:'8px',color:'white',background:'red',borderColor:'red'}}
              onClick={handleSubmit}>
                update
            </button>
            </div>
        </form>
        <SendVerificationEmail />
        </div>
    )
}
export default UpdateProfile;