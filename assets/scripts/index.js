import { equipesF1 } from "./equipes&pilotos.js";
import { pistasF1 } from "./pistas.js";
import { paises } from "./paises.js"; 

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
    let nomeS = "";
    for (let i = 3; i < pista.gp.length; i++) {
        nomeS = nomeS + pista.gp[i];
    }
    nome = nomeS.toLowerCase().replace(" ", "-");

    const container = document.createElement("div");
    container.classList.add("container");

    const auxiliar = document.createElement("div");
    auxiliar.classList.add("auxiliar");

    const pistaDiv = document.createElement("div");
    pistaDiv.classList.add("pista");

    const pistaImg = document.createElement("img");
    pistaImg.classList.add("pista-img");
    pistaImg.src = `assets/images/pistas/${nome}.png`;

    const info = document.createElement("div");
    info.classList.add("info");

    const nomePista = document.createElement("span");
    nomePista.classList.add("nome-pista");
    nomePista.innerHTML = `GP ${pista.gp}`;

    const dataPista = document.createElement("span");
    dataPista.classList.add("data-pista");
    dataPista.innerHTML = `${pista.data}`;

    const bandeira = document.createElement("img");
    bandeira.src = `https://flagsapi.com/${pista.pais}/flat/64.png`;

    const diaPista = `${pista.data[pista.data.length - 5]}${pista.data[pista.data.length - 4]}`;
    const mesPista = `${pista.data[pista.data.length - 2]}${pista.data[pista.data.length - 1]}`;
    const data = new Date();

    grid.appendChild(auxiliar);
    auxiliar.appendChild(container);
    container.appendChild(pistaDiv);
    container.appendChild(info);
    pistaDiv.appendChild(pistaImg);
    info.appendChild(nomePista);
    info.appendChild(dataPista);
    nomePista.appendChild(bandeira);

    if (pista.sprint) {
        const sprint = document.createElement("img");
        sprint.src = `assets/images/sprint.png`;
        sprint.classList.add("sprint");
        pistaDiv.appendChild(sprint);
    }

    if (mesPista < data.getMonth() + 1 || (mesPista == data.getMonth() + 1 && diaPista < data.getDate())) {
        const check = document.createElement("i");
        check.classList.add("fa-regular");
        check.classList.add("fa-circle-check");
        dataPista.appendChild(check);
    }

    if (grid.classList.contains("admin")) {
        let pais;
        const labelGP = document.createElement("label");
        labelGP.innerText = "GP de: ";
        labelGP.htmlFor = `input-gp-${nome}`;

        const inputGP = document.createElement("input");
        inputGP.classList.add(`input-gp`);
        inputGP.id = `input-gp-${nome}`;
        inputGP.value = nomeS;

        const labelPais = document.createElement("label");
        labelPais.innerText = "País: ";
        labelPais.htmlFor = `select-pais-${nome}`;

        const selectPais = document.createElement("select");
        selectPais.classList.add(`select-pais`);
        selectPais.id = `select-pais-${nome}`;

        paises.forEach((p) => {
            const option = document.createElement("option");
            option.value = p.sigla;
            option.innerHTML = `${p.nome} (${p.sigla})`;
            if (pista.pais == p.sigla) {
                pais = p;
            }
            selectPais.appendChild(option);
        });
        selectPais.value = pais.sigla;

        const labelSprint = document.createElement("label");
        labelSprint.innerText = "Sprint: ";
        labelSprint.htmlFor = `btn-sprint-${nome}`;
        const btnSprint = document.createElement("button");
        btnSprint.classList.add(`btn-sprint`);
        btnSprint.id = `btn-sprint-${nome}`;
        const slcSprint = document.createElement("div");
        if (pista.sprint) {
            btnSprint.classList.add("on");
        }

        const labelDate = document.createElement("label");
        labelDate.innerText = "Dia: ";
        labelDate.htmlFor = `select-date-${nome}`;
        const selectDate = document.createElement("select");
        selectDate.classList.add(`select-date`);
        selectDate.id = `select-date-${nome}`;
        for (let c = 1; c <= 31; c++) {
            const option = document.createElement("option");
            option.value = c;
            option.innerHTML = c;
            selectDate.appendChild(option);
        }
        if (pista.data[pista.data.length - 5] == 0) {
            selectDate.value = pista.data[pista.data.length - 4];
        } else {
            selectDate.value = pista.data[pista.data.length - 5] + pista.data[pista.data.length - 4];
        }

        const labelMonth = document.createElement("label");
        labelMonth.innerText = "Mês: ";
        labelDate.htmlFor = `select-mes-${nome}`;
        const selectMonth = document.createElement("select");
        selectMonth.classList.add(`select-mes`);
        selectMonth.id = `select-mes-${nome}`;
        for (let c = 1; c <= 12; c++) {
            const option = document.createElement("option");
            option.value = c;
            option.innerHTML = c;
            selectMonth.appendChild(option);
        }
        if (pista.data[pista.data.length - 2] == 0) {
            selectMonth.value = pista.data[pista.data.length - 1];
        } else {
            selectMonth.value = pista.data[pista.data.length - 2] + pista.data[pista.data.length - 1];
        }

        auxiliar.appendChild(labelGP);
        auxiliar.appendChild(inputGP);

        auxiliar.appendChild(labelPais);
        auxiliar.appendChild(selectPais);

        auxiliar.appendChild(labelSprint);
        auxiliar.appendChild(btnSprint);
        btnSprint.appendChild(slcSprint);

        auxiliar.appendChild(labelDate);
        auxiliar.appendChild(selectDate);

        auxiliar.appendChild(labelMonth);
        auxiliar.appendChild(selectMonth);
    }
});

if (grid.classList.contains("admin")) {
    const inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.value = "Enviar";
    tracksSec.appendChild(inputSubmit);
}

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
    if (!constructorsSec.classList.contains("admin")) {
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
            equipe.pilotos[0].pontuacao + equipe.pilotos[1].pontuacao
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
    if (!driversSec.classList.contains("admin")) {
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
            equipe.pilotos.forEach((p) => {
                if (piloto.nome == p.nome) {
                    equipePiloto = equipe.nome;
                }
            });
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
    }
});
