const note = require("express").Router();
const fs = require("fs");

// router method to get notes from local storage
note.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// router method to post new notes and store them in local storage
note.post("/notes", (req, res) => {
  const newNote = req.body;
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
  });
  fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(newNote);
  });
});

// router method to delete notes from local storage
note.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    newNotes = notes.filter((note) => note.id !== id);
    fs.writeFile("db/db.json", JSON.stringify(newNotes), (err) => {
      if (err) throw err;
      res.json(newNotes);
    });
  });
});

module.exports = note;
