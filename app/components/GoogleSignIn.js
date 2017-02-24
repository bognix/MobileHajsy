import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    DeviceEventEmitter,
    NativeModules,
    requireNativeComponent,
} from 'react-native';

import Config from 'react-native-config'

const GoogleSignInNative = NativeModules.GoogleSignIn;


class GoogleSignInClass {

    constructor() {
        this._user = null;
    }

    hasPlayServices(params = {
        autoResolve: true
    }) {
        return GoogleSignInNative.playServicesAvailable(params.autoResolve);
    }

    configure(params = {}) {
        params = [
            params.scopes || [], params.webClientId || null, params.offlineAccess || false
        ];

        return GoogleSignInNative.configure(...params);
    }

    currentUserAsync() {
        return new Promise((resolve, reject) => {
            const sucessCb = DeviceEventEmitter.addListener('GoogleSignInSilentSuccess', (user) => {
                this._user = user;
                console.log(user);
                GoogleSignInNative.getAccessToken(user)
                    .then((token) => {
                        this._user.accessToken = token;
                        this._removeListeners(sucessCb, errorCb);
                        resolve(this._user);
                    })
                    .catch(err => {
                        this._removeListeners(sucessCb, errorCb);
                        resolve(this._user);
                    });
            });

            const errorCb = DeviceEventEmitter.addListener('GoogleSignInSilentError', (err) => {
                this._removeListeners(sucessCb, errorCb);
                resolve(null);
            });

            GoogleSignInNative.currentUserAsync();
        });
    }

    currentUser() {
        return { ...this._user
        };
    }

    signIn() {
        return new Promise((resolve, reject) => {
            const sucessCb = DeviceEventEmitter.addListener('GoogleSignInSuccess', (user) => {
                this._user = user;
                GoogleSignInNative.getAccessToken()
                    .then((token) => {
                        this._user.accessToken = token;
                        this._removeListeners(sucessCb, errorCb);
                        resolve(this._user);
                    })
                    .catch(err => {
                        this._removeListeners(sucessCb, errorCb);
                        resolve(this._user);
                    });
            });

            const errorCb = DeviceEventEmitter.addListener('GoogleSignInError', (err) => {
                this._removeListeners(sucessCb, errorCb);
                reject(new GoogleSignInError(err.error, err.code));
            });

            GoogleSignInNative.signIn();
        });
    }

    signOut() {
        return new Promise((resolve, reject) => {
            const sucessCb = DeviceEventEmitter.addListener('GoogleSignIutSuccess', () => {
                this._removeListeners(sucessCb, errorCb);
                resolve();
            });

            const errorCb = DeviceEventEmitter.addListener('GoogleSignIutError', (err) => {
                this._removeListeners(sucessCb, errorCb);
                reject(new GoogleSignInError(err.error, err.code));
            });

            this._user = null;
            GoogleSignInNative.signOut();
        });
    }

    revokeAccess() {
        return new Promise((resolve, reject) => {
            const sucessCb = DeviceEventEmitter.addListener('GoogleRevoIeSuccess', () => {
                this._removeListeners(sucessCb, errorCb);
                resolve();
            });

            const errorCb = DeviceEventEmitter.addListener('GoogleRevoIeError', (err) => {
                this._removeListeners(sucessCb, errorCb);
                reject(new GoogleSignInError(err.error, err.code));
            });

            GoogleSignInNative.revokeAccess();
        });
    }

    _removeListeners(...listeners) {
        listeners.forEach(lt => lt.remove());
    }
}

export const GoogleSignIn = new GoogleSignInClass();

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
        GoogleSignIn.configure({
                scopes: ['https://www.googleapis.com/auth/calendar'],
                webClientId: Config.WEB_CLIENT_ID,
            });

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

class GoogleSignInError extends Error {
    constructor(error, code) {
        super(error);
        this.name = 'GoogleSignInError';
        this.code = code;
    }
}
