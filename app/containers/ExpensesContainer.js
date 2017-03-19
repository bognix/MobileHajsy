import React from 'react';
import {connect} from 'react-redux';
import {ExpensesContainer} from '../components/ExpensesContainer';
import {fetchMonth} from '../actions';
import {getNextMonth, getPreviousMonth} from '../services/dateService';

const mapDispatchToProps = (dispatch) => ({
    onMonthForward: (date) => {
        dispatch(fetchMonth(getNextMonth(date)));
    },
    onMonthBackward: (date) => {
        dispatch(fetchMonth(getPreviousMonth(date)));
    }
});

const mapStateToProps = (state) => ({
    currentDate: state.date
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesContainer);
