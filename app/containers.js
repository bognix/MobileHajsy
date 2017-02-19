import React, {PropTypes, Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {Expense} from './components';
import {addExpense, removeExpense} from './actions';

export class ExpensesList extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubcribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubcribe();
    }

    render() {
        const {store} = this.context;

        return (
            <View>
                {store.getState().expenses.map(expense =>
                  <Expense key={expense.id} {...expense} onPress={() => {
                      store.dispatch(removeExpense(expense.id));
                  }}/>
                )}
            </View>
        )
    }
}

ExpensesList.contextTypes = {
    store: PropTypes.object
}

export class AddExpenseForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: '',
            price: '',
            category: ''
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    ref="name"
                    value={this.state.name}
                    onChangeText={name =>this.setState({name})}
                    onSubmitEditing={() => {this.refs.price.focus()}}
                    autoFocus={true}
                />
                <TextInput
                    ref="price"
                    value={this.state.price}
                    onChangeText={price =>this.setState({price})}
                    keyboardType='numeric'
                    onSubmitEditing={() => {this.refs.category.focus()}}
                />
                <TextInput
                    ref="category"
                    value={this.state.category}
                    onChangeText={category =>this.setState({category})}
                />

                <Button
                    onPress={() => {
                        const {store} = this.context;

                        store.dispatch(addExpense({
                            name: this.state.name,
                            price: this.state.price,
                            category: this.state.price,
                            date: new Date().toDateString()
                        }));

                        this.refs.name.clear();
                        this.refs.price.clear();
                        this.refs.category.clear();
                        this.refs.name.focus();
                    }}
                    title="Add Expense"/>
            </View>
        )
    }
}

AddExpenseForm.contextTypes = {
    store: PropTypes.object
}
