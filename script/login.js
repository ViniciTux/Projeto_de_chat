function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("senha").value;

  const usuarios = [
    { usuario: "mimmarcelo", senha: "Teste123" },
    { usuario: "vinicius", senha: "6767" },
    { usuario: "halisson", senha: "123abc" },
    { usuario: "ratao", senha: "4141" },
    { usuario: "eduardo", senha: "1234" }
  ];

  const valido = usuarios.find(u => u.usuario === user && u.senha === pass);

  if (valido) {

    localStorage.setItem("user", user);

    window.location.href = "chat.html";

  } else {
    alert("Usuário ou senha inválidos");

    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
  }
}


function fazerLogin(event) {
  event.preventDefault();
  login();
}