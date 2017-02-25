import {GoogleSignInButton} from './GoogleSignInButton';
import React from 'react';


export const UserLogin = ({onPress}) => (
  <GoogleSignInButton
    style={{width: 48, height: 48}}
    size={GoogleSignInButton.Size.Icon}
    color={GoogleSignInButton.Color.Light}
    onPress={onPress}/>
);
