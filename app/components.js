import React, {PropTypes} from 'react';
import {Text, View, Button, TextInput} from 'react-native';

const Expense = ({name, price, category, date}) => (
    <View>
      <Text>What: {name}, How much: {price}, Category: {category}, When: {date}</Text>
    </View>
)

Expense.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}

export const Expenses = ({expenses = [], onAddExpenseClick}) => (
    <View>
        {expenses.map(expense =>
          <Expense key={expense.id} {...expense} />
        )}
        <AddExpense onButtonPress={onAddExpenseClick.bind(this)} />
    </View>
)

Expenses.propTypes = {
    onAddExpenseClick: PropTypes.func.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired).isRequired,
}

class AddExpense extends React.Component {
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
                    onSubmitEditing={() => {this.refs.price.focus}}
                    autoFocus={true}
                />
                <TextInput
                    ref="price"
                    value={this.state.price}
                    onChangeText={price =>this.setState({price})}
                    keyboardType='numeric'
                    onSubmitEditing={() => {this.refs.category.focus}}
                />
                <TextInput
                    ref="category"
                    value={this.state.category}
                    onChangeText={category =>this.setState({category})}
                />


                <Button
                    onPress={() => {
                        this.props.onButtonPress({
                            name: this.state.name,
                            price: this.state.price,
                            category: this.state.category,
                            date: new Date().toDateString()
                        });

                        this.refs.name.clear();
                        this.refs.name.focus();
                        this.refs.price.clear();
                        this.refs.category.clear();
                    }}
                    title="Add Expense"/>
            </View>
        )
    }
}

AddExpense.propTypes = {
    onButtonPress: PropTypes.func.isRequired
}
