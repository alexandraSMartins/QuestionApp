//Import functions
import {emailValidator, dateValidator, dateNextDayValidator} from './Validators';

const mongoose = require('mongoose');
const validationErrors = require('./ValidationErrors');

var emailValidators = [
    {validator: emailValidator, message: validationErrors.INVALID_EMAIL}
]

var dateValidators = [
    {validator: dateValidator, message: validationErrors.INVALID_DATE},
    {validator: dateNextDayValidator, message: validationErrors.INVALID_DATE_NEXTDAY}
]

const QuestionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, validationErrors.REQUIRED_NAME]
    },
    email: {
        type: String,
        required: [true, validationErrors.REQUIRED_EMAIL],
        validate: emailValidators
    },
    date: {
        type: Date,
        required: [true, validationErrors.REQUIRED_DATE],
        validate: dateValidators
    },
    observations: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('questions', QuestionSchema);