const router = require('express').Router();
const store = require('../db/store');

// GET route to display notes on homepage
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// POST route to jott new notes and store them in local storage
router.post('/notes', (req, res) => {
  store
    .addNotes(req.body)
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// DELETE route to delete notes
router.delete('/notes/:id', (req, res) => {
  store
    .removeNotes(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
