export const turnMonth = value => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months[value];
}

export const turnDays = value => {
    const days = [
        "Mon.",
        "Tue.",
        "Wed.",
        "Thu.",
        "Fri.",
        "Sat.",
        "Sun."
    ];
    return days[value];
}

export const turnDate = value => {
    const stringVal = `${value}`;
    if(stringVal[1] === '1'){
        return `${value}<sup>st</sup>`;
    }
    else if(stringVal[1] === '2'){
        return `${value}<sup>nd</sup>`;
    }
    else if(stringVal[1] === '3'){
        return `${value}<sup>rd</sup>`;
    }
    return `${value}<sup>th</sup>`;
}

export const detectNight = value => {
    return value > 12 ? true : false;
}