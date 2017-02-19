import { createStore } from 'redux'
import {expensesReducer} from './reducers'
import {Expenses, AddExpense} from './components'
import React from 'react';
import {addExpense, removeExpense} from './actions';
import {View} from 'react-native';

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
    this.unsubcribe = store.subscribe(this.updateState.bind(this));
  }

  componentWillUnmount() {
    this.unsubcribe();
  }

  updateState() {
    this.setState(store.getState());
  }

  addExpense(expense) {
    store.dispatch(addExpense(expense));
  }

  removeExpense(id) {
    store.dispatch(removeExpense(id));
  }

  render() {
    return(
      <View>
        <Expenses expenses={this.state.expenses} onExpensePress={this.removeExpense.bind(this)}/>
        <AddExpense onPress={this.addExpense.bind(this)} />
      </View>
    )
  }
}
