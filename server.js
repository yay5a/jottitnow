const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET homepage to jott notes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes page to jott notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
