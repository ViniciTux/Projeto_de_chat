let user = localStorage.getItem("user") || "Anônimo";
let current = "";

const bloqueados = ["msi", "mecanica", "refrigeracao"];

function abrirChat(room) {

    if (bloqueados.includes(room)) {
        alert("Você não tem acesso a esse chat");
        return;
    }

    current = room;

    document.getElementById("chatTitle").innerText = "Chat: " + room;

    carregarMensagens(room);
}

function send() {
    const input = document.getElementById("msg");
    const texto = input.value;

    if (!texto || !current) return;

    const box = document.getElementById("chatBox");

    const id = Date.now();

    const msg = document.createElement("div");
    msg.className = "msg";

    msg.innerHTML = `
        <strong>${user}</strong><br>
        ${texto}
    `;

    box.appendChild(msg);

    setTimeout(() => {
        msg.remove();
        removerMensagem(current, id);
    }, 10000);

    salvarMensagem(current, texto, id);

    input.value = "";
    box.scrollTop = box.scrollHeight;
}

function salvarMensagem(room, texto, id) {

    let dados = JSON.parse(sessionStorage.getItem(room)) || [];

    dados.push({
        id: id,
        user: user,
        msg: texto
    });

    sessionStorage.setItem(room, JSON.stringify(dados));
}

function carregarMensagens(room) {

    const box = document.getElementById("chatBox");
    box.innerHTML = "";

    let dados = JSON.parse(sessionStorage.getItem(room)) || [];

    dados.forEach(m => {

        const div = document.createElement("div");
        div.className = "msg";

        div.innerHTML = `
            <strong>${m.user}</strong><br>
            ${m.msg}


        `;

        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}

function removerMensagem(room, id) {

    let dados = JSON.parse(sessionStorage.getItem(room)) || [];

    dados = dados.filter(m => m.id !== id);

    sessionStorage.setItem(room, JSON.stringify(dados));
}

function irParaDevs() {
    window.location.href = "../html/dev.html";
}

function sair() {

    localStorage.removeItem("user");

    window.location.href = "../html/login.html";
}

function enviarMensagem(event) {
    event.preventDefault(); 
    send();
}