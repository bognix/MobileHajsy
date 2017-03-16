import React from 'react';
import ExpensesList from '../containers/ExpensesList';
import {View, Button, Text} from 'react-native';

export const ExpensesContainer = ({currentDate, onMonthForward, onMonthBackward}) => {
    return (
        <View>
            <Text>{currentDate}</Text>
            <Button onPress={() => onMonthBackward(currentDate)} title="<<"/>
            <ExpensesList />
            <Button onPress={() => onMonthForward(currentDate)} title=">>" />
        </View>
    );
}
