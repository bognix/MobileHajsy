import {generateRandomInt} from '../utils/random';

export const deserializeExpenses = (payload = {}) => {
    const { values }  = payload;

    return values ? values.map((entry) => {
        return {
            name: entry[0],
            price: entry[1],
            category: entry[2],
            date: entry[3],
            id: generateRandomInt()
        }
    }) : [];
}

export const serializeExpense = (expense = {}) => ([destructExpense(expense)]);

export const serializeExpenses = (expenses = []) => (expenses.map((expense) => destructExpense(expense)));

const destructExpense = (expense) => ([expense.name, expense.price, expense.category, expense.date]);
