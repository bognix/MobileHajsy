export const getCurrentMonth = () => {
    return getMonthYear(new Date());
}

export const getMonthYear = (dateObject) => {
    return `${formatMonth(dateObject.getMonth())}-${dateObject.getFullYear()}`;
}

const formatMonth = (monthIndex) => {
    return appendZero(monthIndex + 1);
}

const appendZero = (value) => {
    if (value < 10) {
        return `0${value}`;
    }

    return value;
}

const createDateBaseOnMothYear = (date) => {
    const dateArr = date.split('-');

    dateArr.splice(1, 0, '1');

    return dateArr.join('-');
}


export const getPreviousMonth = (monthYearStr) => {
    const date = new Date(createDateBaseOnMothYear(monthYearStr)),
        previousMonthDate = new Date(date.setMonth(date.getMonth() - 1));

    return getMonthYear(previousMonthDate);
}

export const getNextMonth = (monthYearStr) => {
    const date = new Date(createDateBaseOnMothYear(monthYearStr)),
        nextMonthDate = new Date(date.setMonth(date.getMonth() + 1));

    return getMonthYear(nextMonthDate);

}
