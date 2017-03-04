import { createStore, applyMiddleware } from 'redux';
import {mobileHajs} from './reducers';
import ExpensesList from './containers/ExpensesList';
import ExpensesFilter from './containers/ExpensesFilter';
import AddExpenseForm from './containers/AddExpenseForm';
import {Navigation} from './containers/Navigation';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

export const MobileHajs = () => (
  <Provider store={composeStoreWithMiddleware(mobileHajs)}>
    <View>
      <Navigation />
      <ExpensesFilter />
      <ExpensesList />
      <AddExpenseForm />
    </View>
  </Provider>
)
