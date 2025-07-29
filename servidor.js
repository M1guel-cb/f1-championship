const express = require("express");
const path = require("path");
const app = express();
const porta = 5500;
const equipesF1 = require(`${path.join(__dirname, "assets", "scripts", "equipes&pilotos.js")}`);
const paisesF1 = require(`${path.join(__dirname, "assets", "scripts", "paises.js")}`);
const pistasF1 = require(`${path.join(__dirname, "assets", "scripts", "pistas.js")}`);
const mongoose = require("mongoose");

const uri =
    "mongodb+srv://M1guel-cb:Mcb%40291107@f1db.agmerpf.mongodb.net/F1?retryWrites=true&w=majority&appName=f1Db";

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Conectado ao MongoDB Atlas na database 'F1'"))
    .catch((err) => console.error("❌ Erro ao conectar:", err));

const Equipe = mongoose.model("equipes&pilotos", {
    nome: String,
    nacionalidade: String,
    pilotos: Array,
});

const Pais = mongoose.model("paises", {
    nome: String,
    sigla: String,
});

const Pista = mongoose.model("pistas", {
    gp: String,
    data: String,
    pais: String,
    sprint: Boolean
});

// app.get("/inserir", async (req, res) => {
//     try {
//         await Pista.insertMany(pistasF1);
//         await Pais.insertMany(paisesF1);
//         res.send("Lista inserida com sucesso!");
//     } catch (err) {
//         res.status(500).send("Erro ao inserir: " + err.message);
//     }
// });

app.use(express.static(path.join(__dirname, "assets")));

app.get("/equipes", async (req, res) => {
    try {
        const todasEquipes = await Equipe.find();
        res.json(todasEquipes);
    } catch (err) {
        res.status(500).send("Erro ao buscar dados: " + err.message);
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "pages", "index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "pages", "admin.html"));
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});
