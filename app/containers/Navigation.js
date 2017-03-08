import React from 'react';
import {connect} from 'react-redux';
import {UserMenu} from '../components/UserMenu';
import {logInAndFetchData} from '../actions';
import {GoogleSignIn} from '../services/GoogleSignIn';
import GoogleSheets from '../services/GoogleSheets';

const mapStateToProps = (state) => {
    return {
            user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLoginPress: () => {
        const googleSignInService = new GoogleSignIn();

        googleSignInService.configure().
            then(() => {
                return googleSignInService.signIn();
            }).
            then((user) => {
                dispatch(logInAndFetchData(user));
            });
    }
})

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
