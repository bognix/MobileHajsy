import {
    combineReducers
} from 'redux';
import {
    ADD_EXPENSE,
    REMOVE_EXPENSE,
    CATEGORY_CHANGE,
    USER_LOGIN,
    FETCH_SPREADSHEET_DATA
} from './constants';

const initialState = {
    expenses: {
        list: [],
        loading: false,
        error: false
    },
    user: {},
    category: ''
}

const expensesReducer = (expenses = initialState.expenses, action) => {
    switch (action.type) {
    case `${FETCH_SPREADSHEET_DATA}_PENDING`:
        return {
            loading: true,
            list: expenses.list
        }
    case `${FETCH_SPREADSHEET_DATA}_FULFILLED`:
        console.log("FULFILLED", action);
        return {
            loading: false,
            list: action.data
        }
    case `${FETCH_SPREADSHEET_DATA}_REJECTED`:
        console.log("REJECTED", action);
        return {
            loading: false,
            error: true,
            list: []
        }

    case ADD_EXPENSE:
        return Object.assign(
            {},
            expenses,
            {
                list: [
                    ...expenses.list,
                    {
                        name: action.name,
                        price: action.price,
                        category: action.category,
                        date: action.date,
                    }
                ]
            }
        );
    case REMOVE_EXPENSE:
        return Object.assign(
            {},
            expenses,
            {
                list: expenses.list.filter((expense) => (expense.id !== action.id))
            }
        );

    default:
        return expenses;
    }
}

const categoryFilterReducer = (category = initialState.category, action) => {
    switch (action.type) {
    case CATEGORY_CHANGE:
        return action.category;
    default:
        return category;
    }
}

const userLoginReducer = (user = initialState.user, action) => {
    switch (action.type) {
    case USER_LOGIN:
        return Object.assign({}, user, {
            loggedIn: true,
            avatar: action.avatar,
            name: action.name,
            token: action.token
        });
    default:
        return user
    }
}

export const mobileHajs = combineReducers({
    expenses: expensesReducer,
    user: userLoginReducer,
    category: categoryFilterReducer
});
