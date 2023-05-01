const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Direct notesRouter onto /api
app.use('/api', notesRouter);

// GET homepage to jott notes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes page to jott notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
