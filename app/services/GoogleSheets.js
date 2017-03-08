import {serializeExpenses, serializeExpense} from '../serializers/googleSheetsSerializer';
import {generateRandomInt} from '../utils/random';

const existingSheets = [];
const range = 'A:E';

function createRequest({
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

function getSheets(requestProps) {
    return new Promise((resolve, reject) => {
        if (existingSheets.length > 0) {
            return resolve(existingSheets);
        }

        return fetch(createRequest(requestProps))
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

        getSheets(requestProps)
            .then(() => fetch(createRequest({
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

export function addRow (expense, {sheetName, ...requestProps}) {
   return new Promise((resolve, reject) => {
       createSheet(sheetName, requestProps).
               then(() => fetch(createRequest({
                   method: 'post',
                   path: `/values/${sheetName}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
                   body: JSON.stringify({
                       values: serializeExpense(expense)
                   }),
                   ...requestProps
               }))).
               then((response) => {
                   if (response.ok) {
                       resolve();
                   }

                   return reject(response.status);
               }).
               catch((err) => {
                   reject(err);
               });
   });
}

function buildCreateSheetRequest (properties) {
    return {
        path: ':batchUpdate',
        body: JSON.stringify({
            requests: [
                {
                    "addSheet": {
                        "properties": {
                            sheetId: generateRandomInt(),
                            title: properties.sheetTitle,
                            hidden: false
                        }
                    }
                }],
            "includeSpreadsheetInResponse": false,
            "responseRanges": [
                range
            ],
            "responseIncludeGridData": false
        }),
        method: 'post'
    };
}

function createSheet (sheetName, requestProps) {
    const sheetToFetch = existingSheets.find((sheet) => sheet.properties.title === sheetName);

    return new Promise((resolve) => {
        if (sheetToFetch) {
            resolve();
        } else {
            existingSheets.push({
                properties: {
                    title: sheetName
                }
            });

            fetch(createRequest(buildCreateSheetRequest({
                sheetTitle: sheetName
            }), requestProps)).then(resolve);
        }
    });
}
