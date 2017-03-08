import {
    ADD_EXPENSE,
    REMOVE_EXPENSE,
    USER_LOGIN,
    CATEGORY_CHANGE,
    FETCH_SPREADSHEET_DATA,
    ADD_EXPENSE_ASYNC
} from './constants';
import {getAll, addRow} from './services/GoogleSheets';

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

const logIn = (user) => {
    return {
        type: USER_LOGIN,
        loggedIn: true,
        name: user.name,
        token: user.accessToken,
        avatar: user.photo
    }
}

const fetchSpreadSheetData = (props) => {
    return {
        type: FETCH_SPREADSHEET_DATA,
        payload: getAll(props)
    }
};

export const logInAndFetchData = (user) => {
    //TODO this should be calculated
    const sheetName = '03-2017-spendings';
    //TODO this should be user prop in state
    const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

    return (dispatch, getState) => {
        //TODO logIn should be async
        dispatch(logIn(user));
        const {user: {token}} = getState();

        dispatch(fetchSpreadSheetData({token, spreadSheetId, sheetName}));
    }
}

export const addExpenseAsync = (expense) => {
    //TODO this should be calculated base on expense date
    const sheetName = '03-2017-spendings';
    //TODO this should be user prop in state
    const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

    return (dispatch, getState) => {
        const {user: {token}} = getState();

        dispatch({
            type: ADD_EXPENSE_ASYNC,
            payload: {
                promise: addRow(expense, {token, spreadSheetId, sheetName}),
                data: expense
            }
        });
    }
}
