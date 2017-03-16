import { createStore, applyMiddleware } from 'redux';
import {mobileHajs} from './reducers';
import ExpensesContainer from './containers/ExpensesContainer';
import ExpensesFilter from './containers/ExpensesFilter';
import AddExpenseForm from './containers/AddExpenseForm';
import {Navigation} from './containers/Navigation';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware(),
  thunk
)(createStore);

export const MobileHajs = () => (
  <Provider store={composeStoreWithMiddleware(mobileHajs)}>
    <View>
      <Navigation />
      <ExpensesFilter />
      <ExpensesContainer />
      <AddExpenseForm />
    </View>
  </Provider>
)
