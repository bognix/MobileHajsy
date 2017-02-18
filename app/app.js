import { Provider } from 'react-redux'
import { createStore } from 'redux'
import expense from './reducers'
import {Expenses} from './components'
import React, { Component } from 'react';

let store = createStore(expense);

const Main = () => {
  return (
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
}

export default Main
