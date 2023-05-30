const express = require('express');
const router = express.Router();
const store = require('../db/store');

// GET route to get jotts
router.get('/', async (req, res) => {
  try {
    const jotts = await store.getJotts();
    res.json(jotts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to add new jotts
router.post('/', async (req, res) => {
  try {
    const jott = await store.addJott(req.body);
    res.json(jott);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete jotts
router.delete('/:id', async (req, res) => {
  try {
    await store.removeJott(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
