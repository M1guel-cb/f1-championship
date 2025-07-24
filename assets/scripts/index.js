import { equipesF1 } from "./equipes&pilotos.js";
import { pistasF1 } from "./pistas.js";

const f1Title = document.querySelector("header > h1");
const tracksSec = document.querySelector("section.tracks");
const grid = document.querySelector("section.tracks > .grid");

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
var clickedT = true;

pistasF1.forEach((pista) => {
    let nome = "";
    for (let i = 3; i < pista.gp.length; i++) {
        nome = nome + pista.gp[i];
    }
    nome = nome.toLowerCase().replace(" ", "-");

    const container = document.createElement("div");
    container.classList.add("container");

    const pistaDiv = document.createElement("div");
    pistaDiv.classList.add("pista");

    const pistaImg = document.createElement("img");
    pistaImg.classList.add("pista-img");
    pistaImg.src = `assets/images/pistas/${nome}.png`;

    const info = document.createElement("div");
    info.classList.add("info");

    const nomePista = document.createElement("span");
    nomePista.classList.add("nome-pista");
    nomePista.innerHTML = `GP ${pista.gp}`

    const dataPista = document.createElement("span");
    dataPista.classList.add("data-pista");
    dataPista.innerHTML = `${pista.data}`

    const bandeira = document.createElement("img");
    bandeira.src = `https://flagsapi.com/${pista.pais}/flat/64.png`;
    
    grid.appendChild(container);
    container.appendChild(pistaDiv);
    container.appendChild(info);
    pistaDiv.appendChild(pistaImg);
    info.appendChild(nomePista);
    info.appendChild(dataPista);
    nomePista.appendChild(bandeira);

    if (pista.sprint) {
        const sprint = document.createElement("img")
        sprint.src = `assets/images/sprint.png`
        sprint.classList.add("sprint")
        pistaDiv.appendChild(sprint)
    }
});

f1Title.addEventListener("mousedown", () => {
    clickedP = false;
    clickedC = false;
    clickedT = true;
    constructorBack.classList.remove("active");
    constructorsSec.classList.remove("active");
    driverBack.classList.remove("active");
    driversSec.classList.remove("active");
    tracksSec.classList.add("active");
});

//Quando o mouse passa por cima da navegação do campeonato de construtores, ativa a tag de ativação
constructorHead.addEventListener("mouseover", navConst);
function navConst() {
    if (!constructorBack.classList.contains("active") || !constructorsSec.classList.contains("active")) {
        constructorBack.classList.add("active");
        if (!clickedP) {
            constructorsSec.classList.add("active");
            tracksSec.classList.remove("active");
        }
    }
}

//Quando o mouse sai, se não tiver sido clicado, retira a tag de ativação
constructorHead.addEventListener("mouseleave", mouseOutConst);
function mouseOutConst() {
    if (!clickedC) {
        constructorBack.classList.remove("active");
        constructorsSec.classList.remove("active");
        if (clickedT) {
            tracksSec.classList.add("active");
        }
    }
}

//Se for clicado, registra o click
constructorHead.addEventListener("mousedown", mouseCheckConst);
function mouseCheckConst() {
    clickedC = true;
    clickedP = false;
    clickedT = false;
    tracksSec.classList.remove("active");
    mouseOutPilot();
    navConst();
}

//Quando o mouse passa por cima da navegação do campeonato de construtores, ativa a tag de ativação
driverHead.addEventListener("mouseover", navPilot);
function navPilot() {
    if (!driverBack.classList.contains("active") || !driversSec.classList.contains("active")) {
        driverBack.classList.add("active");
        if (!clickedC) {
            driversSec.classList.add("active");
            tracksSec.classList.remove("active");
        }
    }
}

//Quando o mouse sai, se não tiver sido clicado, retira a tag de ativação
driverHead.addEventListener("mouseleave", mouseOutPilot);
function mouseOutPilot() {
    if (!clickedP) {
        driverBack.classList.remove("active");
        driversSec.classList.remove("active");
        if (clickedT) {
            tracksSec.classList.add("active");
        }
    }
}

//Se for clicado, registra o click
driverHead.addEventListener("mousedown", mouseCheckPilot);
function mouseCheckPilot() {
    clickedP = true;
    clickedC = false;
    clickedT = false;
    tracksSec.classList.remove("active");
    mouseOutConst();
    navPilot();
}

//Varre a lista de equipes
equipesF1.forEach((equipe) => {
    //Cria e coloca a <li>
    const itemC = document.createElement("li");

    //Cria uma <div> auxiliar
    const divisao = document.createElement("div");

    //Cria o <span> com o nome do equipe
    const equipeNome = document.createElement("span");
    equipeNome.innerHTML = `<strong>${equipe.nome}</strong>`;

    //Cria o <span> dos pontos do equipe
    const equipePontos = document.createElement("span");
    equipePontos.innerHTML = `<strong>${
        equipe.pontuacao_equipe != null ? equipe.pontuacao_equipe : 0
    }</strong> points`;

    //Cria a <img> da bandeira
    const logo = document.createElement("img");
    const bandeira = document.createElement("img");
    bandeira.src = `https://flagsapi.com/${equipe.nacionalidade}/flat/64.png`;
    bandeira.classList.add("bandeira");

    //Aplica tudo na ordem correta
    constructorsOl.appendChild(itemC);
    itemC.appendChild(divisao);
    divisao.appendChild(logo);
    divisao.appendChild(equipeNome);
    equipeNome.appendChild(bandeira);
    itemC.appendChild(equipePontos);

    switch (equipe.nome) {
        case "McLaren":
            itemC.classList.add("mclaren");
            logo.src = `assets/images/logo-equipes/mclaren-512.png`;
            break;
        case "Ferrari":
            itemC.classList.add("ferrari");
            logo.src = `assets/images/logo-equipes/ferrari-512.png`;
            break;
        case "Mercedes":
            itemC.classList.add("mercedes");
            logo.src = `assets/images/logo-equipes/mercedes-512.png`;
            break;
        case "Red Bull Racing":
            itemC.classList.add("red-bull");
            logo.src = `assets/images/logo-equipes/red-bull-512.png`;
            break;
        case "Williams Racing":
            itemC.classList.add("williams");
            logo.src = `assets/images/logo-equipes/williams-512.png`;
            break;
        case "Aston Martin":
            itemC.classList.add("aston-martin");
            logo.src = `assets/images/logo-equipes/aston-martin-512.png`;
            break;
        case "Alpine":
            itemC.classList.add("alpine");
            logo.src = `assets/images/logo-equipes/alpine-512.png`;
            break;
        case "Haas":
            itemC.classList.add("haas");
            logo.src = `assets/images/logo-equipes/haas-512.png`;
            break;
        case "Sauber":
            itemC.classList.add("sauber");
            logo.src = `assets/images/logo-equipes/sauber-512.png`;
            break;
        case "Racing Bulls":
            itemC.classList.add("racing-bulls");
            logo.src = `assets/images/logo-equipes/racing-bulls-512.png`;
            break;
    }

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
    const nome = piloto.nome.split(" ");
    pilotoNome.innerHTML = `${nome[0]} <strong>${nome[1]}</strong> - <strong>${piloto.numero}</strong>`;

    //Cria o <span> dos pontos do piloto
    const pilotoPontos = document.createElement("span");
    pilotoPontos.innerHTML = `<strong>${piloto.pontuacao != null ? piloto.pontuacao : 0}</strong> points`;

    //Cria a <img> da bandeira
    const logo = document.createElement("img");
    const bandeira = document.createElement("img");
    bandeira.src = `https://flagsapi.com/${piloto.nacionalidade}/flat/64.png`;
    bandeira.classList.add("bandeira");

    //Aplica tudo na ordem correta
    driversOl.appendChild(itemD);
    itemD.appendChild(divisao);
    divisao.appendChild(logo);
    divisao.appendChild(pilotoNome);
    pilotoNome.appendChild(bandeira);
    itemD.appendChild(pilotoPontos);

    let equipePiloto;
    equipesF1.forEach((equipe) => {
        if (piloto.nome == equipe.pilotos[0].nome || piloto.nome == equipe.pilotos[1].nome) {
            equipePiloto = equipe.nome;
        }
    });

    switch (equipePiloto) {
        case "McLaren":
            itemD.classList.add("mclaren");
            logo.src = `assets/images/logo-equipes/mclaren-512.png`;
            break;
        case "Ferrari":
            itemD.classList.add("ferrari");
            logo.src = `assets/images/logo-equipes/ferrari-512.png`;
            break;
        case "Mercedes":
            itemD.classList.add("mercedes");
            logo.src = `assets/images/logo-equipes/mercedes-512.png`;
            break;
        case "Red Bull Racing":
            itemD.classList.add("red-bull");
            logo.src = `assets/images/logo-equipes/red-bull-512.png`;
            break;
        case "Williams Racing":
            itemD.classList.add("williams");
            logo.src = `assets/images/logo-equipes/williams-512.png`;
            break;
        case "Aston Martin":
            itemD.classList.add("aston-martin");
            logo.src = `assets/images/logo-equipes/aston-martin-512.png`;
            break;
        case "Alpine":
            itemD.classList.add("alpine");
            logo.src = `assets/images/logo-equipes/alpine-512.png`;
            break;
        case "Haas":
            itemD.classList.add("haas");
            logo.src = `assets/images/logo-equipes/haas-512.png`;
            break;
        case "Sauber":
            itemD.classList.add("sauber");
            logo.src = `assets/images/logo-equipes/sauber-512.png`;
            break;
        case "Racing Bulls":
            itemD.classList.add("racing-bulls");
            logo.src = `assets/images/logo-equipes/racing-bulls-512.png`;
            break;
    }
});
