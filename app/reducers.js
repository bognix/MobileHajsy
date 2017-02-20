const initialState = {
    expenses: [
        {
            name: 'food',
            price: 40,
            category: 'food',
            date: new Date().toDateString(),
            id: 1
        }
    ]
}

export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return Object.assign({}, state, {
                expenses: [
                    ...state.expenses,
                    {
                        name: action.name,
                        price: action.price,
                        category: action.category,
                        date: action.date,
                    }
                ]
            });
        case 'REMOVE_EXPENSE':
            return Object.assign({}, state, {
                    expenses: state.expenses.filter((expense) => (expense.id !== action.id))
                });
        default:
            return state;
    }
}
