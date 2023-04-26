const express = require('express');

// Importing modular route for notes
const notesRouter = require('./notes');

const app = express();

// Initializing notes route
app.use('/notes', notesRouter);

module.exports = app;