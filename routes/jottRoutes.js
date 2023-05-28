const router = require('express').Router();
const store = require('../db/store');

// GET route to display notes on homepage
router.get('/jotts', (req, res) => {
  store
    .getJotts()
    .then((jotts) => {
      return res.json(jotts);
    })
    .catch((err) => res.status(500).json(err));
});

// POST route to jott new notes and store them in local storage
router.post('/jotts', (req, res) => {
  store
    .addJott(req.body)
    .then((jott) => res.json(jott))
    .catch((err) => res.status(500).json(err));
});

// DELETE route to delete notes
router.delete('/jotts/:id', (req, res) => {
  store
    .removeJott(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
