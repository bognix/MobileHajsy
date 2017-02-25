import React, {Component, PropTypes} from 'react';
import {View, DeviceEventEmitter,requireNativeComponent} from 'react-native';
import {GoogleSignInNative} from '../services/GoogleSignIn';

const GoogleSignInButtonNative = requireNativeComponent('GoogleSignInButton', {
    name: 'GoogleSignInButtonNative',
    propTypes: {
        ...View.propTypes,
        size: PropTypes.number,
        color: PropTypes.number
    }
});

export class GoogleSignInButton extends Component {
    componentDidMount() {
        this._clickListener = DeviceEventEmitter.addListener('GoogleSignInButtonClicked', () => {
            this.props.onPress && this.props.onPress();
        });
    }

    componentWillUnmount() {
        this._clickListener && this._clickListener.remove();
    }

    render() {
        return (
            <GoogleSignInButtonNative { ...this.props} />
        );
    }
}

GoogleSignInButton.Size = {
    Icon: GoogleSignInNative.BUTTON_SIZE_ICON,
    Standard: GoogleSignInNative.BUTTON_SIZE_STANDARD,
    Wide: GoogleSignInNative.BUTTON_SIZE_WIDE
};

GoogleSignInButton.Color = {
    Auto: GoogleSignInNative.BUTTON_COLOR_AUTO,
    Light: GoogleSignInNative.BUTTON_COLOR_LIGHT,
    Dark: GoogleSignInNative.BUTTON_COLOR_DARK
};
