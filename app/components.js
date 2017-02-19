import React, {PropTypes} from 'react';
import {Text, View, Button} from 'react-native';

export const Expense = ({name, price, category, date, onPress}) => (
    <View>
      <Text>What: {name}, How much: {price}, Category: {category}, When: {date}</Text>
      <Button onPress={onPress} title="-" />
    </View>
)

Expense.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}
