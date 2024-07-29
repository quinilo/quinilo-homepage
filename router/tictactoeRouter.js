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

    if (getGame(id) === null) {
        game = {
            id: id,
            board: [
                ['X'], ['-'], ['-'],
                ['-'], ['-'], ['-'],
                ['-'], ['-'], ['X']
            ],
            p1: name,
            p1token: generateToken(),
            p2: "-",
            p2token: generateToken(),
            state: "waiting"
        }

        games.push(game)
    } else {

        game = getGame(id)

        if (game.state !== "waiting") {
            res.render("tictactoe/alreadyRunning", {lang: lang(req.lang)})
            return
        }

        game.p2 = name
        game.state = "ingame"

    }

    res.render("tictactoe/game", {lang: lang(req.lang), token: "asd", id: id})
})

router.get("/data/:id", (req, res) => {

    let game = getGame(req.params.id)

    game.p1token = "-"
    game.p2token = "-"

    res.send(game)

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
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;

    let password = '';

    for (let i = 0; i < 15 /*length*/; i++) {
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