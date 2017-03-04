export default class GoogleSheets {

    constructor() {
        this.existingSheets = [];
    }

    configure({spreadSheetId, token}) {
        this.spreadSheetId = spreadSheetId;
        this.token = token;
    }

    _createRequest({
        method = 'get',
        body = null,
        path
    } = {}) {
        const authHeader = `Bearer ${this.token}`,
            requestConfig = {
                method,
                token: this.token,
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

        // Path has to start with `/` if it's expected
        return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${this.spreadSheetId}${path}`, requestConfig);
    }

    _getSheets() {
        return new Promise((resolve, reject) => {
            if (this.existingSheets.length > 0) {
                return resolve(existingSheets);
            }

            return fetch(this._createRequest())
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    return reject(response.json());
                })
                .then((spreadSheetData) => {
                    console.log(spreadSheetData);
                    this.existingSheets = spreadSheetData.sheets;
                    resolve(existingSheets);
                })
                .catch((err) => {
                    console.log("ERROR", err)
                });
        });
    }

    getAll(sheetID) {
        return new Promise((resolve, reject) => {

            this._getSheets()
                .then(() => fetch(this._createRequest({
                    path: `/values/${sheetID}!${range}`
                })))
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    return reject(response.status);
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    err.then((err) => console.log("ERROR 2", err))
                    reject(err);
                });
        });
    }
}
