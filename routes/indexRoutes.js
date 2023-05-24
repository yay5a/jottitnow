const path = require('path');
const router = require('express').Router();

// GET homepage to jott notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/jott.html'));
});

// '*' wildcard route to index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;
