import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// Regular unconnected component
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expenseItem) => (
                    <ExpenseListItem
                        {...expenseItem} 
                        key={expenseItem.id}
                    />
                ))
            )
        }
    </div>
);

// Function that maps state items to props
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filter)
    };
}; 

// Call to connect that pulls all of the above together
export default connect(mapStateToProps)(ExpenseList);

// When you connect your component to a redux store it means that it becomes reactive: your component will be rerendered each time it gets the new values of data  