import {generateRandomInt} from '../utils/random';

export const serializeExpenses = (payload = {}) => {
    const {values} = payload;

    return values.map((entry) => {
        return {
            name: entry[0],
            price: entry[1],
            category: entry[2],
            date: entry[3],
            id: generateRandomInt()
        }
    });
}

export const serializeExpense = (expense = {}) => {
    // yes, it's array of arrays
    return [
        [expense.name, expense.price, expense.category, expense.date]
    ];
}
