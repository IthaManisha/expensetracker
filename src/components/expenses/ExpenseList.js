import React from 'react';
import Card from '../UI/card';

const ExpenseList=(props)=>{
    return(
        <>
        {
           props.expenses.map((expense)=>(
            <Card key={expense.id}>
                <span>{expense.money}</span>
                <span>{expense.description}</span>
                <span>{expense.category}</span>
            </Card>
           )) 
        }
        </>
    )
}
export default ExpenseList