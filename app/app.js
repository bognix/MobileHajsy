import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {expensesReducer} from './reducers'
import {Expenses} from './components'
import React, { Component } from 'react';

let store = createStore(expensesReducer);

const Main = () => {
  return (
      <Expenses expenses={store.getState().expenses}/>
  )
}

export default Main
