import { createStore } from 'redux'
import {expensesReducer} from './reducers'
import {ExpensesList, AddExpenseForm} from './containers'
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
