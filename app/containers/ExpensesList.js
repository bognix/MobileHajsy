import React from 'react';
import {connect} from 'react-redux';
import {ExpensesList} from '../components/ExpensesList';
import {removeExpense} from '../actions';

const getVisibleExpenses = (expenses, category) => {
    if (category) {
        return expenses.filter((expense) => expense.category.indexOf(category) === 0);
    }

    return expenses;
}

const mapStateToProps = (state) => ({
    expenses: getVisibleExpenses(state.expenses, state.category)
});

const mapDispatchToProps = (dispatch) => ({
    onPress: (id) => {
        dispatch(removeExpense(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
