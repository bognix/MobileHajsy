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

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses.list, state.category),
        loading: state.expenses.loading,
        error: state.expenses.error
    }
};

const mapDispatchToProps = (dispatch) => ({
    onPress: (id) => {
        dispatch(removeExpense(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
