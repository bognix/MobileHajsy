import React from 'react';
import {connect} from 'react-redux';
import {UserMenu} from '../components/UserMenu';
import {logIn, fetchSpreadSheetData} from '../actions';
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
                //TODO not sure if this is the right place!!!!!!!
                const GoogleSheetsApi = new GoogleSheets();
                //TODO spreadSheet ID should be read from user account
                GoogleSheetsApi.configure({token: user.accessToken, spreadSheetId: '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI'});

                //TODO spreadSheet name should be calculated
                dispatch(fetchSpreadSheetData(GoogleSheetsApi.getAll('03-2017-spendings')));
                dispatch(logIn(user));
            });
    }
})

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
