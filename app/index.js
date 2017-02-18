import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {expensesReducer} from './reducers'
import {Expenses} from './components'
import React from 'react';
import {addExpense} from './actions';

const store = createStore(expensesReducer);

export class MobileHajs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: []
    }
  }

  componentDidMount() {
    this.updateState()
    store.subscribe(this.updateState.bind(this));
  }

  updateState() {
    this.setState(store.getState());
  }

  addExpense(expense) {
    store.dispatch(addExpense(expense));
  }

  render() {
    return(
        <Expenses expenses={this.state.expenses} onAddExpenseClick={this.addExpense.bind(this)}/>
    )
  }
}
