const express = require('express').Router();
const notes = express.route();
const fs = require('fs');

// GET route to display notes
notes.get('/api/notes', (req, res) => {
  const notes = req.body;
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(err)
    res.json(JSON.parse(notes.JSONdata));
  });
});

// POST route to jott new notes and store them in local storage
notes.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const jott = JSON.parse(data);
    jott.push(newNote);
  });
  fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(newNote);
  });
});

// DELETE route to delete notes
notes.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    newNotes = notes.filter((note) => note.id !== id);
    fs.writeFile('db/db.json', JSON.stringify(newNotes), (err) => {
      if (err) throw err;
      res.json(newNotes);
    });
  });
});

module.exports = notes;
