import React, {PropTypes} from 'react';
import {
  Text,
  View
} from 'react-native';

const Expense = ({name, price, category, date}) => (
    <View>
      <Text>{name}, </Text><Text>{price},</Text><Text>{category},</Text><Text>{date}</Text>
    </View>
)

// Expense.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired
// }
//
export const Expenses = ({expenses = [{name: 'bar', price: '123', category:'foo', date: 'today', id: 7}]}) => (
    <View>
        <Expense key={expenses[0].id} {...expenses[0]}/>
    </View>
)

// Expenses.propTypes = {
//     onExpenseClick: PropTypes.func.isRequired,
//     expenses: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       nname: PropTypes.string.isRequired,
//       price: PropTypes.string.isRequired,
//       category: PropTypes.string.isRequired,
//       date: PropTypes.string.isRequired
//     }).isRequired).isRequired,
// }
