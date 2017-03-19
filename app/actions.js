import {
    USER_LOGIN,
    CATEGORY_CHANGE,
    ADD_EXPENSE_ASYNC,
    REMOVE_EXPENSE_ASYNC,
    FETCH_SPREADSHEET_DATA_FOR_MONTH
} from './constants';
import {
    getAll,
    addRow,
    replaceAllRows
} from './services/GoogleSheets';
import { GoogleSignIn } from './services/GoogleSignIn';
import { getCurrentMonth, getMonthYear } from './services/dateService';

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

const logInAsync = () => {
    const googleSignInService = new GoogleSignIn();

    return googleSignInService.configure()
        .then(() => {
            return googleSignInService.signIn()
        });
}

const fetchSpreadSheetDataForMonth = (date, requestProps) => {
    return {
        type: FETCH_SPREADSHEET_DATA_FOR_MONTH,
        payload: {
            promise: getAll(requestProps),
            data: {
                date
            }
        }
    }
}

export const logInAndFetchData = (user) => {
    const date = getCurrentMonth();
    const sheetName = `${date}-spendings`;
    //TODO this should be user prop in state
    const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

    return (dispatch) => {
        logInAsync()
            .then((user) => {
                //TODO this logic should be handled in logInAsync
                dispatch(logIn(user));
                return Promise.resolve(user);
            })
            .then((user) => {
                const { accessToken } = user;

                dispatch(fetchSpreadSheetDataForMonth(date, {
                    token: accessToken,
                    spreadSheetId,
                    sheetName
                }))
            })
    }
}

export const addExpenseAsync = (expense) => {
    const date = new Date();
    const sheetName = `${getMonthYear(date)}-spendings`;
    //TODO this should be user prop in state
    const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

    return (dispatch, getState) => {
        const { user: { token } } = getState();

        dispatch({
            type: ADD_EXPENSE_ASYNC,
            payload: {
                promise: addRow({...expense, date}, {
                    token,
                    spreadSheetId,
                    sheetName
                }),
                data: {...expense, date}
            }
        });
    }
}

export const removeExpenseAsync = (toRemove) => {
    return (dispatch, getState) => {
        const { user: { token }, expenses: { list } } = getState();
        const expenses = list.filter((expense) => expense.id !== toRemove);
        const expenseToRemove = list.find((expense) => expense.id === toRemove);
        const sheetName = `${getMonthYear(new Date(expenseToRemove.date))}-spendings`;
        //TODO this should be user prop in state
        const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

        dispatch({
            type: REMOVE_EXPENSE_ASYNC,
            payload: {
                promise: replaceAllRows(expenses, {
                    token,
                    spreadSheetId,
                    sheetName
                }),
                data: expenses
            }
        });
    }
}

export const fetchMonth = (date) => {
    const sheetName = `${date}-spendings`;
    //TODO this should be user prop in state
    const spreadSheetId = '1kk2x5fZ6TyhX_o8nNKILEnuU2LZ4L3QGgeQTRBtXTfI';

    return (dispatch, getState) => {
        const { user: { token }, expenses: { list } } = getState();

        dispatch(fetchSpreadSheetDataForMonth(date, {
            token,
            spreadSheetId,
            sheetName
        }));
    };
}
