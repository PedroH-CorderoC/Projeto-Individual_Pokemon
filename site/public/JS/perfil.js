function Perfil() {
    resetar()
    perfil.style.color = 'white'
    perfil.style.background = 'blue'
    perfil.style.boxShadow = 'none'
    if (Nome_Usuario == '') {
        TelaGrande.innerHTML = `<div class="Sem-Cadastro"><h1>Para Ter uma experiencia completa é necessario fazer o seu cadastro de Treinador</h1><br>
                      <h3>Faça o Login para liberar a Customização</h3></div>`

        TelaBaixa.innerHTML = `<div class="Sem-Cadastro"><b>Você ainda não entrou</b>
                            <p>Seu progresso não será iniciado. A conta dara um nome ao seu cartão</p>
                            <button class='botao' onclick="Login()">Entrar ou cadastrar</button></div>`
    } else {
    TelaGrande.innerHTML = `
    <h3>Cartão de treinador</h3>
    <img> ${Nome_Usuario}
    <p id="dataRegistro">Carregando...</p>
    Avatar`;
    TelaBaixa.innerHTML = ``;

    fetch(`/perfil/buscar/${Email_Usuario}`)
    .then(dados => {
        document.getElementById("dataRegistro").innerHTML =
            `Treinador desde: ${dados.dtRegistro}`;
    });
}    
}
