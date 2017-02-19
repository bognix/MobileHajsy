export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        name: expense.name,
        price: expense.price,
        category: expense.category,
        date: expense.date,
        id: expense.id
    }
}

export const removeExpense = (id) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
}
