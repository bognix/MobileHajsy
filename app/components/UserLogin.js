import {GoogleSignIn, GoogleSignInButton} from './GoogleSignIn';
import React from 'react';


export const Navigation = () => (
  <GoogleSignInButton
    style={{width: 48, height: 48}}
    size={GoogleSignInButton.Size.Icon}
    color={GoogleSignInButton.Color.Light}
    onPress={() => {
      console.log('pressed');
    }}/>
);
