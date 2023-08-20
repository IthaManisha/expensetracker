import React,{useContext, useState} from 'react';
import AuthForm from './components/Auth/AuthForm';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';
import ExpenseForm from './components/expenses/ExpenseForm';
import ExpenseList from './components/expenses/ExpenseList';

function App() {
  const authctx=useContext(AuthContext)
  const isLoggedIn=authctx.isLoggedIn
  const[expenseList,setExpenseList]=useState([])
  const saveHandler=(data)=>{
    const updatedItems=[...expenseList,data];
    setExpenseList(updatedItems);
  }
  return (
    <>
      {!isLoggedIn && <AuthForm/>}
      {isLoggedIn && <Home />}
      {isLoggedIn && <ExpenseForm onSaveData={saveHandler}/>}
      {isLoggedIn && <ExpenseList expenses={expenseList}/>}
    </>
  );
}

export default App;
