import React,{useContext} from 'react';
import AuthForm from './components/Auth/AuthForm';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';

function App() {
  const authctx=useContext(AuthContext)
  const isLoggedIn=authctx.isLoggedIn
  return (
    <>
      {!isLoggedIn && <AuthForm/>}
      {isLoggedIn && <Home />}
    </>
  );
}

export default App;
