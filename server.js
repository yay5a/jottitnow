const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== id);
        fs.writeFile('db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});