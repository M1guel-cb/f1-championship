import { equipesF1 } from "./api.js";

const constructorsOl = document.querySelector("ol.constructors");
const driversOl = document.querySelector("ol.drivers");
let listaPilotos = [];
let c = 0;
let i = 0;
let counterP = 0

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
    pilotoNome.innerHTML = `${piloto.nome}`

    //Cria o <span> dos pontos do piloto
    const pilotoPontos = document.createElement("span");
    pilotoPontos.innerHTML = `${piloto.pontuacao != null ? piloto.pontuacao : 0} points`

    //Cria a <img> da bandeira
    const bandeira = document.createElement("img")
    bandeira.src = `https://flagsapi.com/${piloto.nacionalidade}/flat/32.png`;

    //Aplica tudo na ordem correta
    driversOl.appendChild(itemD);
    itemD.appendChild(divisao);
    divisao.appendChild(bandeira)
    divisao.appendChild(pilotoNome)
    divisao.appendChild(pilotoPontos)
});
