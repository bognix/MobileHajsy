import React from 'react';
import {connect} from 'react-redux';
import {ExpensesList} from '../components/ExpensesList';
import {removeExpense} from '../actions';

const mapStateToProps = (state) => ({
    expenses: state.expenses
});

const mapDispatchToProps = (dispatch) => ({
    onPress: (id) => {
        dispatch(removeExpense(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
