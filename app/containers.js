import React, {PropTypes, Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {Expense} from './components';

export const ExpensesList = ({expenses=[], onExpensePress}) => (
    <View>
        {expenses.map(expense =>
          <Expense key={expense.id} {...expense} onPress={() => onExpensePress(expense.id)}/>
        )}
    </View>
)

ExpensesList.propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    onExpensePress: PropTypes.func.isRequired
}

export class AddExpenseForm extends Component {
    constructor(props) {
        super(props);

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
                        this.props.onPress({
                            name: this.state.name,
                            price: parseInt(this.state.price) || 0,
                            category: this.state.category,
                            date: new Date().toDateString()
                        });

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

AddExpenseForm.propTypes = {
    onPress: PropTypes.func.isRequired
}
