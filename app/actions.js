let nextTodoId = 0;

export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        name: expense.name,
        price: expense.price,
        category: expense.category,
        date: expense.date,
        id: nextTodoId++
    }
}

export const removeExpense = (id) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
}

export const logIn = () => ({
    type: 'USER_LOGIN'
})

export const logOut = () => ({
    type: 'USER_LOGOUT'
})
