const express = require("express")
const path = require("path");
const app = express()

app.use(express.json())
app.set("view engine", "ejs")
app.set("case sensitive routing", false)
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000)