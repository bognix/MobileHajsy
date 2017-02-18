const expense = (state = {}, action) => {
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
                        id: nextExpense
                    }
                ]
            });
        case 'REMOVE_EXPENSE':
            return Object.assign({}, state, {
                expenses: state.expenses.map((expense, index) => {
                    if (index !== action.index) {
                        return expense;
                    }
                })
            })
        default:
            return state;
    }
}

export default expense;
