import React,{useContext, useState,useEffect} from 'react';
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
  useEffect(() => {
    if (isLoggedIn) {
      // Fetch expenses data when logged in
      fetchExpensesData();
    }
  }, [isLoggedIn]); 
  const fetchExpensesData=()=>{
    let url='https://login-4cf44-default-rtdb.firebaseio.com/expenses.json'
    fetch(url,{
      method:'GET'
    }).then((response)=>response.json())
    .then((data)=>{
      if(data){
        const expensesArray = Object.values(data);
        setExpenseList(expensesArray);
      }
    }).catch((error)=>{console.error('Error fetching expenses data:', error);})
  }
  /*const fetchExpensesData = async () => {
    try {
      const url =
        'https://login-4cf44-default-rtdb.firebaseio.com/expenses.json';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Fetching expenses data failed.');
      }

      const data = await response.json();
      if (data) {
        const expensesArray = Object.values(data);
        setExpenseList(expensesArray);
      }
    } catch (error) {
      console.error('Error fetching expenses data:', error);
    }
  };*/
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
