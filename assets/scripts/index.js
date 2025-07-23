import { equipesF1 } from "./api.js";

const constructorsOl = document.querySelector("ol.constructors");
const driversOl = document.querySelector("ol.drivers");
let listaPilotos = [];
let c = 0;
let i = 0;

equipesF1.forEach((equipe) => {
    const itemC = document.createElement("li");
    itemC.innerHTML = `${equipe.nome}`;
    constructorsOl.appendChild(itemC);
    equipe.pilotos.forEach((piloto) => {
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

listaPilotos.forEach((piloto) => {
    const itemD = document.createElement("li");
    itemD.innerHTML = `${piloto.nome}`;
    driversOl.appendChild(itemD);
});
