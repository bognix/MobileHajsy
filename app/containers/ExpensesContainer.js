import React from 'react';
import {connect} from 'react-redux';
import {ExpensesContainer} from '../components/ExpensesContainer';
import {nextMonth, previousMonth} from '../actions';

const mapDispatchToProps = (dispatch) => ({
    onMonthForward: (date) => {
        dispatch(nextMonth(date));
    },
    onMonthBackward: (date) => {
        dispatch(previousMonth(date));
    }
});

const mapStateToProps = (state) => ({
    currentDate: state.date
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesContainer);
