import {
    combineReducers
} from 'redux';
import {
    CATEGORY_CHANGE,
    USER_LOGIN,
    FETCH_SPREADSHEET_DATA,
    ADD_EXPENSE_ASYNC,
    REMOVE_EXPENSE_ASYNC,
    CHANGE_MONTH
} from './constants';

import {generateRandomInt} from './utils/random';
import {getCurrentMonth} from './services/dateService';

const initialState = {
    expenses: {
        list: [],
        loading: false
    },
    user: {},
    category: '',
    date: getCurrentMonth()
}

const expensesReducer = (expenses = initialState.expenses, action) => {
    switch (action.type) {
    case `${FETCH_SPREADSHEET_DATA}_PENDING`:
        return {
            loading: true,
            list: expenses.list
        }
    case `${FETCH_SPREADSHEET_DATA}_FULFILLED`:
        return {
            loading: false,
            list: action.payload
        }
    case `${FETCH_SPREADSHEET_DATA}_REJECTED`:
        return {
            loading: false,
            list: []
        }

    case `${ADD_EXPENSE_ASYNC}_PENDING`:
        return {
            loading: true,
            list: [
                ...expenses.list,
                {
                    name: action.payload.name,
                    price: action.payload.price,
                    category: action.payload.category,
                    date: action.payload.date,
                    id: generateRandomInt()
                }
            ]
        }
    case `${ADD_EXPENSE_ASYNC}_FULFILLED`:
        return {
            ...expenses,
            loading: false
        }
    case `${ADD_EXPENSE_ASYNC}_REJECTED`:
        return {
            ...expenses,
            loading: false
        }

    case `${REMOVE_EXPENSE_ASYNC}_PENDING`:
        return {
            ...expenses,
            loading: true,
            list: action.payload
        };
    case `${REMOVE_EXPENSE_ASYNC}_FULFILLED`:
        return {
            ...expenses,
            loading: false
        };
    case `${REMOVE_EXPENSE_ASYNC}_REJECTED`:
        return {
            ...expenses,
            loading: false
        }

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

const dateReducer = (date = initialState.date, action) => {
    switch (action.type) {
        case CHANGE_MONTH:
            return action.date;
        default:
            return date;
    }
}

export const mobileHajs = combineReducers({
    expenses: expensesReducer,
    user: userLoginReducer,
    category: categoryFilterReducer,
    date: dateReducer
});
