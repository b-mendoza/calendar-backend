// user routes / Auth
// host + /api/auth

const dbConnection = require('./database/config.js');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// creating the express server
const app = express();

// data base
dbConnection();

// CORS
app.use(cors());

// public directory
app.use(express.static('public'));

// reading and parsing of the body
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// listen queries
app.listen(process.env.PORT, () =>
    console.log(`Server running in port ${process.env.PORT}`)
);
