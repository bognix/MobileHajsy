import { createStore } from 'redux';
import {expensesReducer} from './reducers';
import ExpensesList from './containers/ExpensesList';
import AddExpenseForm from './containers/AddExpenseForm';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

export const MobileHajs = () => (
  <Provider store={createStore(expensesReducer)}>
    <View>
      <ExpensesList />
      <AddExpenseForm />
    </View>
  </Provider>
)
