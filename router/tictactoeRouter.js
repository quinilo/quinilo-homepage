const express = require('express');
const router = express.Router();

let games = [];

function lang(code) {
    return require('../lang/' + code + ".json");
}

router.get('/', (req, res) => {
    res.render("tictactoe/home", {lang: lang(req.lang)})
});

router.post("/", express.urlencoded({ extended: false }), (req, res) => {
    const {id, name} = req.body;

    let game = {}

    const symbol1 = '🟩'
    const symbol2 = '⬜'
    const random = Math.floor(Math.random() * 2);

    if (getGame(id) === null) {
        game = {
            id: id,
            board: [
                '▪️', '▪️️️️', '▪️',
                '▪️', '▪️', '▪️',
                '▪️', '▪️', '▪️'
            ],
            p1: {
                name: name,
                token: generateToken(),
                symbol: "-"
            },
            p2: {
                name: "-",
                token: generateToken(),
                symbol: "-"
            },
            state: "waiting",
            version: "0.1_ALPHA"
        }

        if (random === 0) {
            game.p1.symbol = symbol1
            game.p2.symbol = symbol2
        } else {
            game.p1.symbol = symbol2
            game.p2.symbol = symbol1
        }

        games.push(game)

        res.render("tictactoe/game", {lang: lang(req.lang), token: game.p1.token, id: id})
    } else {

        game = getGame(id)

        if (game.state !== "waiting") {
            //res.render("tictactoe/alreadyRunning", {lang: lang(req.lang)})
            //return
        }

        game.p2.name = name
        game.state = "ingame"

        res.render("tictactoe/game", {lang: lang(req.lang), token: game.p2.token, id: id})

    }
})

router.get("/board", (req, res) => {
    res.render("tictactoe/board", {lang: lang(req.lang)})
})

router.get("/data/:id", (req, res) => {

    let game = getGame(req.params.id)

    game.p1.token = "-"
    game.p2.token = "-"

    res.send(game)

})

router.get("/place/:id/:token/:board", (req, res) => {

    let game = getGame(req.params.id)
    let player

    if (game.p1.token === req.params.token) player = game.p1
    if (game.p2.token === req.params.token) player = game.p2

    if (game.board.at(req.params.board) === "▪️️️️") {

        game.board[req.params.board] = player.token

    }

})

function getGame(id) {
    for (let game of games) {
        if (game.id === id) {
            return game
        }
    }
    return null
}

function generateToken() {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#_+';

    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;

    let password = '';

    for (let i = 0; i < 25 /*length*/; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

router.get('/waiting', (req, res) => {
    res.render("tictactoe/waiting", {lang: lang(req.lang)})
});

router.get('/game', (req, res) => {
    res.render("tictactoe/game", {lang: lang(req.lang)})
});

module.exports = router;