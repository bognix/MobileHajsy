import React from 'react';
import {connect} from 'react-redux';
import {UserMenu} from '../components/UserMenu';
import {logInAndFetchData} from '../actions';
const mapStateToProps = (state) => {
    return {
            user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLoginPress: () => dispatch(logInAndFetchData())
})

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
