import React, {PropTypes} from 'react';
import {UserLogin} from './UserLogin';
import {Text, View} from 'react-native';

export const UserMenu = ({loggedIn, onLoginPress}) => {
    const userLoginComponent = <UserLogin onPress={onLoginPress} />,
        userAvatarComponent = (<Text>Siema!</Text>),
        component = loggedIn ? userAvatarComponent : userLoginComponent;

    return (
        <View>{component}</View>
    );
};

UserMenu.propTypes = {
    loggedIn: PropTypes.bool,
    avatar: PropTypes.string,
    onLoginPress: PropTypes.func
}
