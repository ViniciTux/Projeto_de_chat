let currentRoom = "geral";

// bloqueio de acesso (login obrigatório)
let user = localStorage.getItem("user");

if (!user) {
    alert("Você não está logado. Voltando para o login...");
    window.location.href = "../html/login.html";
}

// chats fictícios iniciais
if (!localStorage.getItem("chat_geral")) {
    localStorage.setItem("chat_geral", JSON.stringify([
        {user:"admin", msg:"Bem-vindo ao chat geral"},
        {user:"maria", msg:"Oi pessoal"}
    ]));
}

if (!localStorage.getItem("chat_suporte")) {
    localStorage.setItem("chat_suporte", JSON.stringify([
        {user:"admin", msg:"Suporte ativo"},
        {user:"joao", msg:"Preciso de ajuda"}
    ]));
}

function loadChat() {
    let data = JSON.parse(localStorage.getItem("chat_" + currentRoom)) || [];

    let box = document.getElementById("chatBox");
    box.innerHTML = "";

    data.forEach(m => {
        let p = document.createElement("p");
        p.className = "message";
        p.innerText = `${m.user}: ${m.msg}`;
        box.appendChild(p);
    });
}

function sendMsg() {
    let msg = document.getElementById("msg").value;
    if (!msg) return;

    let key = "chat_" + currentRoom;
    let data = JSON.parse(localStorage.getItem(key)) || [];

    data.push({user: user, msg: msg});

    localStorage.setItem(key, JSON.stringify(data));

    document.getElementById("msg").value = "";
    loadChat();
}

function changeRoom(room) {
    currentRoom = room;
    document.getElementById("roomTitle").innerText = "Sala: " + room;
    loadChat();
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "../html/login.html";
}

// inicializa chat
loadChat();