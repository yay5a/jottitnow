const router = require('express').Router();
const store = require('../db/store');

// GET route to display notes on homepage
router.get('/jott', (req, res) => {
  store
    .getJotts()
    .then((jott) => {
      return res.json(jott);
    })
    .catch((err) => res.status(500).json(err));
});

// POST route to jott new notes and store them in local storage
router.post('/jott', (req, res) => {
  store
    .addNotes(req.body)
    .then((jott) => res.json())
    .catch((err) => res.status(500).json(err));
});

// DELETE route to delete notes
router.delete('/jott/:id', (req, res) => {
  store
    .removeNotes(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
