const express = require("express");
const path = require("path");
const app = express();
const porta = 1000;

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "pages", "index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "pages", "admin.html"));
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});
