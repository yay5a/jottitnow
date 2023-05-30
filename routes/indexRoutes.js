const express = require('express');
const path = require('path');

const router = express.Router();

// GET homepage to display jott notes
router.get('/jotts', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/jotts.html'));
});

// Wildcard route to serve index.html for all other routes
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
