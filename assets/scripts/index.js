import { equipesF1 } from "./api.js";

const constructorsSec = document.querySelector("section.constructors");
const constructorsOl = document.querySelector("section.constructors > ol");
const constructorHead = document.querySelectorAll("header > nav > div")[0];
const constructorBack = document.querySelectorAll(".back-title")[0];

const driversSec = document.querySelector("section.drivers");
const driversOl = document.querySelector("section.drivers > ol");
const driverHead = document.querySelectorAll("header > nav > div")[1];
const driverBack = document.querySelectorAll(".back-title")[1];
let listaPilotos = [];
let c = 0;
let i = 0;

var clickedP,
    clickedC = false;

//Quando o mouse passa por cima da navegação do campeonato de construtores, ativa a tag de ativação
constructorHead.addEventListener("mouseover", navConst);
function navConst() {
    if (!constructorBack.classList.contains("active") || !constructorsSec.classList.contains("active")) {
        constructorBack.classList.add("active");
        if (!clickedP) {
            constructorsSec.classList.add("active");
        }
    }
}

//Quando o mouse sai, se não tiver sido clicado, retira a tag de ativação
constructorHead.addEventListener("mouseleave", mouseOutConst);
function mouseOutConst() {
    if (!clickedC) {
        constructorBack.classList.remove("active");
        constructorsSec.classList.remove("active");
    }
}

//Se for clicado, registra o click
constructorHead.addEventListener("mousedown", mouseCheckConst);
function mouseCheckConst() {
    clickedC = true;
    clickedP = false;
    mouseOutPilot()
    navConst()
}

//Quando o mouse passa por cima da navegação do campeonato de construtores, ativa a tag de ativação
driverHead.addEventListener("mouseover", navPilot);
function navPilot() {
    if (!driverBack.classList.contains("active") || !driversSec.classList.contains("active")) {
        driverBack.classList.add("active");
        if (!clickedC) {
            driversSec.classList.add("active");
        }
    }
}

//Quando o mouse sai, se não tiver sido clicado, retira a tag de ativação
driverHead.addEventListener("mouseleave", mouseOutPilot);
function mouseOutPilot() {
    if (!clickedP) {
        driverBack.classList.remove("active");
        driversSec.classList.remove("active");
    }
}

//Se for clicado, registra o click
driverHead.addEventListener("mousedown", mouseCheckPilot);
function mouseCheckPilot() {
    clickedP = true;
    clickedC = false;
    mouseOutConst()
    navPilot()
}

//Varre a lista de equipes
equipesF1.forEach((equipe) => {
    //Cria e coloca a <li>
    const itemC = document.createElement("li");

    //Cria uma <div> auxiliar
    const divisao = document.createElement("div");

    //Cria o <span> com o nome do equipe
    const equipeNome = document.createElement("span");
    equipeNome.innerHTML = `${equipe.nome}`;

    //Cria o <span> dos pontos do equipe
    const equipePontos = document.createElement("span");
    equipePontos.innerHTML = `${equipe.pontuacao_equipe != null ? equipe.pontuacao_equipe : 0} points`;

    //Cria a <img> da bandeira
    const bandeira = document.createElement("img");
    bandeira.src = `https://flagsapi.com/${equipe.nacionalidade}/flat/32.png`;

    //Aplica tudo na ordem correta
    constructorsOl.appendChild(itemC);
    itemC.appendChild(divisao);
    divisao.appendChild(bandeira);
    divisao.appendChild(equipeNome);
    divisao.appendChild(equipePontos);

    //Varre os pilotos de cada equipe
    equipe.pilotos.forEach((piloto) => {
        //Coloca os pilotos em uma lista, onde eles são ordenados pela pontuação
        const existe = listaPilotos.some((p) => p.nome === piloto.nome);
        if (existe) return;
        let inserido = false;
        for (let i = 0; i < listaPilotos.length; i++) {
            if (piloto.pontuacao > listaPilotos[i].pontuacao) {
                listaPilotos.splice(i, 0, piloto);
                inserido = true;
                break;
            }
        }
        if (!inserido) {
            listaPilotos.push(piloto);
        }
    });
});

//Varre a nova lista de pilotos ordenada
listaPilotos.forEach((piloto) => {
    //Cria e coloca a <li>
    const itemD = document.createElement("li");

    //Cria uma <div> auxiliar
    const divisao = document.createElement("div");

    //Cria o <span> com o nome do piloto
    const pilotoNome = document.createElement("span");
    pilotoNome.innerHTML = `${piloto.nome}`;

    //Cria o <span> dos pontos do piloto
    const pilotoPontos = document.createElement("span");
    pilotoPontos.innerHTML = `${piloto.pontuacao != null ? piloto.pontuacao : 0} points`;

    //Cria a <img> da bandeira
    const bandeira = document.createElement("img");
    bandeira.src = `https://flagsapi.com/${piloto.nacionalidade}/flat/32.png`;

    //Aplica tudo na ordem correta
    driversOl.appendChild(itemD);
    itemD.appendChild(divisao);
    divisao.appendChild(bandeira);
    divisao.appendChild(pilotoNome);
    divisao.appendChild(pilotoPontos);
});
