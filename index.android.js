import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Main from './app/app';

export default class MobileHajs extends Component {
  render() {
    return (
        <Main />
    );
  }
}

AppRegistry.registerComponent('MobileHajs', () => MobileHajs);
