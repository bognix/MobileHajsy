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
            return state.filter((expense) => (expense.id !== action.id));
        default:
            return state;
    }
}

const categoryFilterReducer = (state = '', action) => {
    switch (action.type) {
        case 'CATEGORY_CHANGE':
            return action.category;
        default:
            return state;
    }
}

const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return Object.assign({}, state, {
                loggedIn: true,
                avatar: action.avatar,
                name: action.name,
                token: action.token
            });
        case 'USER_LOGOUT':
            return Object.assign({}, state, {
                loggedIn: false,
                avatar: '',
                name: '',
                token: ''
            });
        default:
            return state
    }
}

export const mobileHajs = combineReducers({
    expenses: expensesReducer,
    user: userLoginReducer,
    category: categoryFilterReducer
});
