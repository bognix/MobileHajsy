import React, {PropTypes} from 'react';
import {Image, StyleSheet} from 'react-native';


export const UserAvatar = ({avatar = ''}) => (
  <Image
    style={styles.icon}
    source={{uri: avatar}}
  />
)

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  }
});

UserAvatar.propTypes = {
      avatar: PropTypes.string
}
