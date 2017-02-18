import React, {PropTypes} from 'react';
import {Text, View} from 'react-native';

const Expense = ({name, price, category, date}) => (
    <View>
      <Text>What: {name}, How much: {price}, Category: {category}, When: {date}</Text>
    </View>
)

Expense.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}

export const Expenses = ({expenses}) => (
    <View>
          {expenses.map(expense =>
              <Expense key={expense.id} {...expense} />
          )}
    </View>
)

Expenses.propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired).isRequired,
}
