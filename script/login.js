const users = [
    {u:"mimmarcelo", p:"Teste123"},
    {u:"admin", p:"1234"},
    {u:"joao", p:"123"},
    {u:"maria", p:"123"},
    {u:"aluno", p:"123"}
];

function login(){
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    let found = users.find(x => x.u === u && x.p === p);

    if(found){
        localStorage.setItem("user", u);
        window.location.href = "chat.html";
    } else {
        document.getElementById("msg").innerText =
        "Acesso negado. Surpreendentemente, o sistema funciona.";
    }
}