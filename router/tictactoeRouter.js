const express = require('express');
const router = express.Router();

function lang(code) {
    return require('../lang/' + code + ".json");
}

router.get('/', (req, res) => {
    res.render("tictactoe/home", {lang: lang(req.lang)})
});

router.get('/waiting', (req, res) => {
    res.render("tictactoe/waiting", {lang: lang(req.lang)})
});

module.exports = router;