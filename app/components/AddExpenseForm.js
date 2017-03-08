import React, {PropTypes, Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {addExpenseAsync} from '../actions';

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
                        const {dispatch} = this.props;

                        dispatch(addExpenseAsync({
                            name: this.state.name,
                            price: this.state.price,
                            category: this.state.category,
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
