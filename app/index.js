import { createStore } from 'redux';
import {expensesReducer} from './reducers';
import ExpensesList from './containers/ExpensesList';
import AddExpenseForm from './containers/AddExpenseForm';
import {Navigation} from './containers/Navigation';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

export const MobileHajs = () => (
  <Provider store={createStore(expensesReducer)}>
    <View>
      <Navigation />
      <ExpensesList />
      <AddExpenseForm />
    </View>
  </Provider>
)
