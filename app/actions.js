let nextExpense = 0;

export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        name: expense.name,
        price: expense.price,
        category: expense.category,
        date: expense.date,
        index: nextExpense
    }
}

export const removeExpenses = (index) => {
    return {
        type: 'REMOVE_EXPENSE',
        index
    }
}
