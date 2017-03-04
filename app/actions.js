import {
    ADD_EXPENSE,
    REMOVE_EXPENSE,
    USER_LOGIN,
    CATEGORY_CHANGE,
    FETCH_SPREADSHEET_DATA
} from './constants';

let nextTodoId = 0;

export const addExpense = (expense) => ({
    type: ADD_EXPENSE,
    name: expense.name,
    price: expense.price,
    category: expense.category,
    date: expense.date,
    id: nextTodoId++
})

export const removeExpense = (id) => {
    return {
        type: REMOVE_EXPENSE,
        id
    }
}

export const logIn = (user) => {
    return {
        type: USER_LOGIN,
        loggedIn: true,
        name: user.name,
        token: user.accessToken,
        avatar: user.photo
    }
}

export const changeCategory = (category) => ({
    type: CATEGORY_CHANGE,
    category
});

export const fetchSpreadSheetData = (promise) => {
    return {
        type: FETCH_SPREADSHEET_DATA,
        payload: promise
    }
};
