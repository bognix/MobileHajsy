import React from 'react';
import {connect} from 'react-redux';
import {UserMenu} from '../components/UserMenu';
import {logIn} from '../actions';
import {GoogleSignIn} from '../services/GoogleSignIn';

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
                dispatch(logIn(user));
            });
    }
})

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
