import React,{useState} from 'react'
import Dropdown from './ExpenseDropdown'

const ExpenseForm=(props)=>{
    const[money,setMoney]=useState('');
    const[description,setDescription]=useState('')
    const [selectedCategory, setSelectedCategory] = useState('');

    const moneyHandler=(event)=>{
        setMoney(event.target.value)
    }
    const descriptionHandler=(event)=>{
        setDescription(event.target.value)
    }
    const categoryHandler = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    const submitHandler=async(event)=>{
        event.preventDefault()
        const expenseData = {
            id: Math.random().toString(),
            money: money,
            description: description,
            category: selectedCategory, // Include selected category in expenseData
        };
        console.log(expenseData); 
        props.onSaveData(expenseData)
        const response=await fetch('https://login-4cf44-default-rtdb.firebaseio.com/expenses.json',{
            method:'POST',
            body:JSON.stringify(expenseData),
            headers:{
                'Content-Type':'application/jSON'
            }
            });
            const data=await response.json();
            console.log(data)
        setMoney('')
        setDescription('')
    }

    return(
        <>
        <form onSubmit={submitHandler} 
        style={{marginLeft:'30%',
        marginRight:'30%',marginTop:'50px',borderRadius: '10px', borderColor: 'black', border: '0.5px solid black',padding:'20px'}}>
            <label>Money Spent:</label>
            <input type="number" value={money} size="100" onChange={moneyHandler}/><br/>
            <label>Description:</label>
            <textarea  row="10" cols="40" value={description} onChange={descriptionHandler} />
            <Dropdown onSelect={categoryHandler}/>
            <button>add expense</button>
        </form>
        </>
    )
}
export default ExpenseForm