import React from 'react';
import {DeviceEventEmitter, NativeModules} from 'react-native';
import Config from 'react-native-config';

export const GoogleSignInNative = NativeModules.GoogleSignIn;
export class GoogleSignIn {
    constructor() {
        this._user = null;
    }

    hasPlayServices(params = {
        autoResolve: true
    }) {
        return GoogleSignInNative.playServicesAvailable(params.autoResolve);
    }

    configure(offlineAccess = false) {
        params = [
            ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/userinfo.profile'] || [],
            Config.WEB_CLIENT_ID || null,
            offlineAccess
        ];

        return GoogleSignInNative.configure(...params);
    }

    currentUserAsync() {
        return new Promise((resolve, reject) => {
            const sucessCb = DeviceEventEmitter.addListener('GoogleSignInSilentSuccess', (user) => {
                this._user = user;
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
