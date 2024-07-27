const express = require('express');
const router = express.Router();

function lang(code) {
    return require('../lang/' + code + ".json");
}

router.get('/', (req, res) => {
    console.log("test")
    res.render("index", {lang: lang(req.lang)})
});

module.exports = router;