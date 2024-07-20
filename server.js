const express = require("express")
const fs = require('fs');
const path = require("path");
const app = express()

const applyRouter = require('./router/baseRouter')
app.use('/:lang', (req, res, next) => {
    req.lang = req.params.lang;
    if (req.params.lang !== "en") if (req.lang !== "de") req.lang = "en"
    next();
});
app.use('/:lang/', applyRouter);

app.use('/', (req, res, next) => {
    req.lang = "de";
    next();
});
app.use('/', applyRouter);

app.use(express.json())
app.set("view engine", "ejs")
app.set("case sensitive routing", false)
app.use(express.static(path.join(__dirname, 'public')))

function getFile(code) {
    return require('./lang/' + code + ".json");
}

function lang(code) {
    return require('./lang/' + code + ".json");
}

app.get('/', (req, res) => {
    console.log("test")
    res.render("index", {lang: lang(req.lang)})
});

app.listen(3000)