const notes = require('express').Router();
const fs = require('fs');

// router method to get notes from local storage
notes.get('/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Post route to jott new notes and store them in local storage
notes.post('/notes', (req, res) => {
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

// Delete route to delete notes
notes.delete('/notes/:id', (req, res) => {
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
