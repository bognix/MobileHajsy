import React from 'react';
import {connect} from 'react-redux';
import {UserMenu} from '../components/UserMenu';
import {logIn} from '../actions';
import {GoogleSignIn} from '../services/GoogleSignIn';

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
    onLoginPress: () => {
        const googleSignInService = new GoogleSignIn();

        googleSignInService.configure().
            then(() => {
                googleSignInService.signIn()
            }).
            then(() => dispatch(logIn(true)));
    }
})

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
