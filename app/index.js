import { createStore } from 'redux';
import {mobileHajs} from './reducers';
import ExpensesList from './containers/ExpensesList';
import ExpensesFilter from './containers/ExpensesFilter';
import AddExpenseForm from './containers/AddExpenseForm';
import {Navigation} from './containers/Navigation';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';


export const MobileHajs = () => (
  <Provider store={createStore(mobileHajs)}>
    <View>
      <Navigation />
      <ExpensesFilter />
      <ExpensesList />
      <AddExpenseForm />
    </View>
  </Provider>
)
