//VARIAVEIS
let timerRef = document.getElementById("display");
const inputhora = document.getElementById("inputHora");
const inputminuto = document.getElementById("inputMinuto");
const ativarAlarmes = document.getElementById("ativarAlarmes");
const addAlarme = document.getElementById("adicionar");
let alarmesArray = [];
let alarmeSom = new Audio("assets/audio/alarme-som.mp3");

let horaInicial = 0, minutoInicial = 0, alarmeIndex = 0;

const appendZero = (valor) => (valor < 10 ? "0" + valor : valor);

const procurarObj = (parametro, valor) => {
    let alarmeObj, 
    objIndex, 
    existe = false;
    alarmesArray.forEach((alarme, index) => {
        if (alarme[parametro] == valor) {
            existe = true;
            alarmeObj = alarme;
            objIndex = index;
            return false;
        }
    });
    return [existe, alarmeObj, objIndex];
};

    //PEGAR HORA
function displayTimer () {
    let date = new Date();
    let [horas, minutos, segundos] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds()),
    ];

    //TEMPO DO DISPLAY
    timerRef.innerHTML = `${horas}:${minutos}:${segundos}`;

    //ALARME
    alarmesArray.forEach((alarme, index) => {
        if(alarme.isActive) {
            if(
                `${alarme.alarmeHora}: ${alarme.alarmeMinuto}` === `${horas}:${minutos}`
            ){
                alarmeSom.play();
                alarmeSom.loop = true;

            }
        }
    });
}

const inputCheck = (inputValor) => {
    inputValor = parseInt(inputValor);
    if(inputValor < 10) {
        inputValor = appendZero(inputValor);
    }
    return inputValor;
};

inputhora.addEventListener("input",() => {
    inputhora.valor = inputCheck(inputhora.valor);
});

inputminuto.addEventListener("input", () => {
    inputminuto.valor = inputCheck(inputminuto.valor);
})

const alarmediv = (alarmeObject) => {
    const {id, alarmeHora, alarmeMinuto} = alarmeObject;

    let alarmediv = document.createElement("div");
    alarmediv.classList.add("alarme");
    alarmediv.setAttribute("data-id", id);
    alarmediv.innerHTML = `<span>${alarmeHora}: ${alarmeMinuto}</span>`;

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (e) => {
        if(e.target.checked) {
            iniciarAlarme(e);
        } else {
            pararAlarme(e);
        }
    });
    alarmediv.appendChild(checkbox);

    let deletarBotao = document.createElement("button");
    //deletarBotao.innerHTML = ;
};

window.onload = () => {
    setInterval(displayTimer);
    horaInicial = 0;
    minutoInicial = 0;
    alarmeIndex = 0;
    alarmesArray = [];
    inputhora.valor = appendZero(horaInicial);
    inputminuto.valor = appendZero(minutoInicial);
}


