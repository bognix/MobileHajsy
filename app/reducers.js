const initialState = {
    idGen: 1,
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
            const nextId = state.idGen + 1;
            return Object.assign({}, state, {
                idGen: nextId,
                expenses: [
                    ...state.expenses,
                    {
                        name: action.name,
                        price: action.price,
                        category: action.category,
                        date: action.date,
                        id: nextId
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
