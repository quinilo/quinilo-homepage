const express = require("express")
const fs = require('fs');
const path = require("path");
const app = express()

//deine mudda 123 ofenäse121

const baseRouter = require('./router/baseRouter')
const tictactoeRouter = require('./router/tictactoeRouter')

app.use('/:lang', (req, res, next) => {
    req.lang = req.params.lang;
    if (req.params.lang !== "en") if (req.lang !== "de") req.lang = "de"
    next();
});
app.use('/:lang/', baseRouter);
app.use('/:lang/tictactoe/', tictactoeRouter)

app.get("/", function(req, res)  {
    res.redirect("/de/")
})

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

app.use(function(req, res, next) {
    res.render("404", {lang: lang(req.lang)});
});


app.listen(80)