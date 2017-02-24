import {
    GoogleSignIn,
    GoogleSignInButton
} from '../components/GoogleSignIn';
import React from 'react';


export const Navigation = () => ( <
    GoogleSignInButton style = {
        {
            width: 48,
            height: 48
        }
    }
    size = {
        GoogleSignInButton.Size.Icon
    }
    color = {
        GoogleSignInButton.Color.Light
    }
    onPress = {
        () => {
            GoogleSignIn.signIn()
                .catch((err) => {
                    console.log('WRONG SIGNIN', err);
                })
                .done();
        }
    }
    />
);
