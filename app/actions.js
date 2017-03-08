import {
    ADD_EXPENSE,
    REMOVE_EXPENSE,
    USER_LOGIN,
    CATEGORY_CHANGE,
    FETCH_SPREADSHEET_DATA
} from './constants';
import {getAll} from './services/GoogleSheets';

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

export const changeCategory = (category) => ({
    type: CATEGORY_CHANGE,
    category
});

export const logIn = (user) => {
    return {
        type: USER_LOGIN,
        loggedIn: true,
        name: user.name,
        token: user.accessToken,
        avatar: user.photo
    }
}

export const fetchSpreadSheetData = (props) => {
    return {
        type: FETCH_SPREADSHEET_DATA,
        payload: getAll(props)
    }
};

export const logInAndFetchData = (user) => {
    const sheetName = '03-2017-spendings';
    const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

    return (dispatch, getState) => {
        //TODO logIn should be async
        dispatch(logIn(user));
        const {user: {token}} = getState();

        dispatch(fetchSpreadSheetData({token, spreadSheetId, sheetName}));
    }
}
