import {combineReducers} from 'redux';

const expensesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                    ...state,
                    {
                        name: action.name,
                        price: action.price,
                        category: action.category,
                        date: action.date,
                    }
                ];
        case 'REMOVE_EXPENSE':
            return state.expenses.filter((expense) => (expense.id !== action.id));
        default:
            return state;
    }
}

const userLoginReducer = (state = false, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return true;
        case 'USER_LOGOUT':
            return false;
        default:
            return state
    }
}

export const mobileHajs = combineReducers({
    expenses: expensesReducer,
    loggedIn: userLoginReducer
});
