import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import Routes
const questionsRoute = require('./routes/questions');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/questions', questionsRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
 );

//Start listening to port
app.listen(process.env.PORT);