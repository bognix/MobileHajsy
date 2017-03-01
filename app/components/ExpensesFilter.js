import React from 'react';
import {TextInput} from 'react-native';
import {changeCategory} from '../actions';

export const ExpensesFilter = ({dispatch}) => (
    <TextInput
        onChangeText={(category) => {
            dispatch(changeCategory(category));
        }}
    />
)
