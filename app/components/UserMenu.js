import React, {PropTypes} from 'react';
import {UserLogin} from './UserLogin';
import {UserAvatar} from './UserAvatar';
import {Text, View} from 'react-native';

export const UserMenu = ({user = {}, onLoginPress}) => {
    const userLoginComponent = <UserLogin onPress={onLoginPress} />,
        userAvatarComponent = <UserAvatar avatar={user.avatar} />,
        component = user.loggedIn ? userAvatarComponent : userLoginComponent;

    return (
        <View>{component}</View>
    );
};

UserMenu.propTypes = {
    loggedIn: PropTypes.bool,
    avatar: PropTypes.string,
    onLoginPress: PropTypes.func
}
