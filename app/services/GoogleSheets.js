import {serializeExpenses} from '../serializers/googleSheetsSerializer';

const existingSheets = [];
const range = 'A:E';

function _createRequest({
    method = 'get',
    body = null,
    path,
    token,
    spreadSheetId
} = {}) {
    const authHeader = `Bearer ${token}`,
        requestConfig = {
            method,
            token,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': authHeader
            },
            mode: 'cors',
            cache: 'default'
        };

    if (body && method === 'post') {
        requestConfig.body = body;
    }

    if (!path && path !== '') {
        path =  '';
    }

    // Path has to start with `/` if it's expected
    return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}${path}`, requestConfig);
}

function _getSheets(requestProps) {
    return new Promise((resolve, reject) => {
        if (existingSheets.length > 0) {
            return resolve(existingSheets);
        }

        return fetch(_createRequest(requestProps))
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return reject(response.json());
            })
            .then((spreadSheetData) => {
                resolve(existingSheets);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function getAll({sheetName, ...requestProps}) {
    return new Promise((resolve, reject) => {

        _getSheets(requestProps)
            .then(() => fetch(_createRequest({
                path: `/values/${sheetName}!${range}`,
                ...requestProps
            })))
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return reject(response.status);
            })
            .then((data) => {
                return resolve(serializeExpenses(data));
            })
            .catch((err) => {
                return reject(err);
            });
    });
}
