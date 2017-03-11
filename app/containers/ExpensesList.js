import React from 'react';
import {connect} from 'react-redux';
import {ExpensesList} from '../components/ExpensesList';
import {removeExpenseAsync} from '../actions';

const getVisibleExpenses = (expenses, category) => {
    if (category) {
        return expenses.filter((expense) => expense.category.indexOf(category) === 0);
    }

    return expenses;
}

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses.list, state.category),
        loading: state.expenses.loading
    }
};

const mapDispatchToProps = (dispatch) => ({
    onPress: (id) => {
        dispatch(removeExpenseAsync(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
