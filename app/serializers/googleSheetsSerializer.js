export const serializeExpenses = (payload = {}) => {
    const {values} = payload;

    return values.map((entry) => {
        // TODO figure out something to do with ID
        return {
            name: entry[0],
            price: entry[1],
            category: entry[2],
            date: entry[3]
        }
    });
}
