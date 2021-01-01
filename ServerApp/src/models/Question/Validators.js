/*  
This file contains the validators for the properties received from API requests
*/

//Email
export const emailValidator = function validateEmail(email) { //The email will be validated using a regular expression
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //taken from https://www.w3resource.com/javascript/form/email-validation.php

    return regExp.test(email);
};


//Date
export const dateValidator = function validateDate(rawDate) {
    return rawDate && !isNaN(rawDate.getTime());
}

export const dateNextDayValidator = function validateDateNextDay(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); //this will work even if today is the 31st. If so, the date will also change the month (and/or year)

    return date - tomorrow > 0;
};