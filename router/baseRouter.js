const express = require('express');
const router = express.Router();

function lang(code) {
    return require('../lang/' + code + ".json");
}

router.get('/contact', (req, res) => {
    res.render("contact", {lang: lang(req.lang)})
});

router.get('/', (req, res) => {
    res.render("index", {lang: lang(req.lang)})
});

module.exports = router;