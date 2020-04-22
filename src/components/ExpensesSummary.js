import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
    if (props.expenses.length) {
        const expenseCount = props.expenses.length;
        const expenseTotal = numeral(expensesTotal(props.expenses) / 100).format('$0,0.00');
        return (
            <p>
                Viewing {expenseCount} expenses totalling {expenseTotal}
            </p>
        )
    } else {
        return <p />
    }
};

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filter)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);