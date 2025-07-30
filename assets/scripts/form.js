const inputNome = document.querySelector("#inome");
const msgNome = document.querySelector(".nome > small");

const inputEmail = document.querySelector("#iemail");
const msgEmail = document.querySelector(".email > small");

const inputSenha = document.querySelector("#isenha");
const iconPassword = document.querySelector(".senha i.fa-eye-slash");
const iconText = document.querySelector(".senha i.fa-eye");
const msgSenha = document.querySelector(".senha > small");

const inputConfirSenha = document.querySelector("#iconfirmacao-senha");
const iconPasswordConf = document.querySelector(".confirmacao i.fa-eye-slash");
const iconTextConf = document.querySelector(".confirmacao i.fa-eye");
const msgConfirSenha = document.querySelector(".confirmacao > small");

const btnSubmit = document.querySelector(".btn");

const login = document.querySelector("span.log");
const cad = document.querySelector("span.cad");
const form = document.querySelector("form");
const title = document.querySelector(".title");

let erro = "";
let mode = "cadastro"
let firstTest = false;
var minusc = /[a-z]/;
let maiusc = /[A-Z]/;
let num = /[0-9]/;
let carc = /[!|@|#|$|%|^|&|*|(|)|-|_|.]/;

login.addEventListener("click", () => {
    form.classList.add("logar");
    login.classList.remove("active");
    cad.classList.add("active");
    btnSubmit.innerHTML = "Entrar na conta"
    title.innerHTML = '<img src="assets/images/formula-1-logo-128px.png" alt="logo-F1" /> Login';
    mode = "login"
});

cad.addEventListener("click", () => {
    form.classList.remove("logar");
    login.classList.add("active");
    cad.classList.remove("active");
    btnSubmit.innerHTML = "Criar conta"
    title.innerHTML = "<img src=\"assets/images/formula-1-logo-128px.png\" alt=\"logo-F1\" /> Cadastro"
    mode = "cadastro"
});

iconPassword.addEventListener("click", () => {
    inputSenha.type = "text";
    inputSenha.setAttribute("placeholder", "Password123@");
    iconPassword.classList.remove("active");
    iconText.classList.add("active");
});

iconText.addEventListener("click", () => {
    inputSenha.type = "password";
    inputSenha.setAttribute("placeholder", "••••••••");
    iconPassword.classList.add("active");
    iconText.classList.remove("active");
});

iconPasswordConf.addEventListener("click", () => {
    inputConfirSenha.type = "text";
    inputConfirSenha.setAttribute("placeholder", "Password123@");
    iconPasswordConf.classList.remove("active");
    iconTextConf.classList.add("active");
});

iconTextConf.addEventListener("click", () => {
    inputConfirSenha.type = "password";
    inputConfirSenha.setAttribute("placeholder", "••••••••");
    iconPasswordConf.classList.add("active");
    iconTextConf.classList.remove("active");
});

function validarNome(nome) {
    if (nome.length > 1) {
        return true;
    } else {
        erro = "Nome inválido";
        return false;
    }
}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validarSenha(senha) {
    if (senha.length < 8) {
        erro = "A senha deve conter pelo menos 8 caracteres!";
        return false;
    } else if (minusc.test(senha) == false) {
        erro = "Sua senha deve conter letras minúsculas!";
        return false;
    } else if (maiusc.test(senha) == false) {
        erro = "Sua senha deve conter letras maiúsculas!";
        return false;
    } else if (num.test(senha) == false) {
        erro = "Sua senha deve conter números!";
        return false;
    } else if (carc.test(senha) == false) {
        erro = "Sua senha deve conter caracteres especiais!";
        return false;
    } else if (senha.length > 24) {
        erro = "Sua senha só pode conter até 20 caracteres!";
        return false;
    } else {
        erro = "";
        return true;
    }
}

function confSenha(senha, confSenha) {
    if (senha === confSenha) {
        return true;
    } else {
        erro = "As senhas não coincidem";
        return false;
    }
}

inputNome.addEventListener("input", () => {
    if (firstTest) {
        if (validarNome(inputNome.value)) {
            msgNome.classList.remove("erro");
            inputNome.classList.remove("erro");
            inputNome.classList.add("correct");
        } else {
            msgNome.classList.add("erro");
            inputNome.classList.add("erro");
            inputNome.classList.remove("correct");
            msgNome.textContent = "*" + erro;
        }
    }
});

inputEmail.addEventListener("input", () => {
    if (firstTest) {
        if (validarEmail(inputEmail.value)) {
            msgEmail.classList.remove("erro");
            inputEmail.classList.remove("erro");
            inputEmail.classList.add("correct");
        } else {
            msgEmail.classList.add("erro");
            inputEmail.classList.add("erro");
            inputEmail.classList.remove("correct");
            msgEmail.textContent = "*" + erro;
        }
    }
});

inputSenha.addEventListener("input", () => {
    if (firstTest) {
        if (validarSenha(inputSenha.value)) {
            msgSenha.classList.remove("erro");
            inputSenha.classList.remove("erro");
            inputSenha.classList.add("correct");
        } else {
            msgSenha.classList.add("erro");
            inputSenha.classList.add("erro");
            inputSenha.classList.remove("correct");
            msgSenha.textContent = "*" + erro;
        }
    }
});

inputConfirSenha.addEventListener("input", () => {
    if (firstTest) {
        if (confSenha(inputSenha.value, inputConfirSenha.value)) {
            msgConfirSenha.classList.remove("erro");
            inputConfirSenha.classList.remove("erro");
            inputConfirSenha.classList.add("correct");
        } else {
            msgConfirSenha.classList.add("erro");
            inputConfirSenha.classList.add("erro");
            inputConfirSenha.classList.remove("correct");
            msgConfirSenha.textContent = "*" + erro;
        }
    }
});

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    firstTest = true;

    if (validarEmail(inputEmail.value)) {
        msgEmail.classList.remove("erro");
        inputEmail.classList.remove("erro");
    } else {
        msgEmail.classList.add("erro");
        inputEmail.classList.add("erro");
        msgEmail.textContent = "*Email inválido";
    }

    if (validarNome(inputNome.value)) {
        msgNome.classList.remove("erro");
        inputNome.classList.remove("erro");
    } else {
        msgNome.classList.add("erro");
        inputNome.classList.add("erro");
        msgNome.textContent = "*" + erro;
    }

    if (validarSenha(inputSenha.value)) {
        msgSenha.classList.remove("erro");
        inputSenha.classList.remove("erro");
    } else {
        msgSenha.classList.add("erro");
        inputSenha.classList.add("erro");
        msgSenha.textContent = "*" + erro;
    }

    if (confSenha(inputSenha.value, inputConfirSenha.value)) {
        msgConfirSenha.classList.remove("erro");
        inputConfirSenha.classList.remove("erro");
    } else {
        msgConfirSenha.classList.add("erro");
        inputConfirSenha.classList.add("erro");
        msgConfirSenha.textContent = "*" + erro;
    }
});
