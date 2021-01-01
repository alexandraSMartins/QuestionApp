//A file containing validators related to the questions form fields

export const required = value => {
    return (value ? undefined : 'Required');
}

export const emailFormat = value => {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //taken from https://www.w3resource.com/javascript/form/email-validation.php

    return regExp.test(value) ? undefined : 'Email is not valid';
} 

export const greaterThanTomorrow = value => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); //this will work even if today is the 31st. If so, the date will also change the month (and/or year)
    
    return value - tomorrow > 0 ? undefined : `Date must be greater than ${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
} 



export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)