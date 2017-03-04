import React, {PropTypes} from 'react';
import {Text, View, Button} from 'react-native';

const Expense = ({name, price, category, date, onPress}) => (
    <View>
      <Text>What: {name}, How much: {price}, Category: {category}, When: {date}</Text>
      <Button onPress={onPress} title="-" />
    </View>
)

Expense.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

export const ExpensesList = ({expenses, onPress}) => (
    <View>
        {expenses.map(expense =>
          <Expense key={expense.id} {...expense} onPress={() => onPress(expense.id)} />
        )}
    </View>
);

Expense.propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    })),
    onPress: PropTypes.func.isRequired
}
