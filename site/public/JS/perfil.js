let fotos_Perfil = ['cyndaquil.png', 'mudkip.png', 'bulba.png', 'eevee.png', 'mew.png', 'torchic.png', 'pikachu.png', 'totodile.png'];
let Cores_Console = ['gold', 'orange', 'green', 'purple', 'gray', 'cyan'];
let Cores_Exibicao = ['Dourado', 'Laranja', 'Verde', 'Roxo', 'Cinza', 'Ciano'];

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
<div class="Cartao">
    <div class="Foto_exibicao" id="imgAvatar"></div>
    <div class="Dados">
        <h2>${Nome_Usuario}</h2>
        <h5>${Email_Usuario}</h5>
        <div class="Linha-Data">
            <h6>Treinador desde:</h6>
            <span id="dataRegistro"></span>
        </div>
    </div>
</div>
Avatar<br>
<div class="Fotos_Alterar" id="imagens"></div><br>
Cores Console<br>
<div class="Cores_Alterar" id="Cores"></div><br>
`;
    TelaBaixa.innerHTML = `<div class='Deslogar'>
    <h1>Deseja Deslogar?</h1><br>
    <h4>Clique no botão aqui em baixo</h4><br>
    <button class='botao' onclick="Deslogar()">Deslogar</button></div>`;


    for (let contador = 0; contador < fotos_Perfil.length; contador++) {
        imagens.innerHTML += `<img src="./fotos/${fotos_Perfil[contador]}" onclick="salvarAvatar('${fotos_Perfil[contador]}')"> `
    }

    for (let contador = 0; contador < Cores_Console.length; contador++) {
        Cores.innerHTML += `<button class='Botao_Cor ${Cores_Exibicao[contador]}_Mostrar' onclick="salvarCor('${Cores_Console[contador]}')">${(Cores_Exibicao[contador])}</button> `
    }

    fetch(`/perfil/buscar/${Email_Usuario}`, {
            method: "GET"
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO Perfil()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    document.getElementById("dataRegistro").innerHTML =
                    `${json.dtRegistro}`;
                    document.getElementById("imgAvatar").innerHTML =
                    `<img src='./fotos/${json.FotoPerfil}'>`;

                    AplicarCor(json.CorConsole); 
                });

            } else {
                console.log("Houve um erro ao buscar o perfil!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })
    }
}


function salvarAvatar(nomeFoto) {
    fetch("/perfil/avatar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: Email_Usuario,
            avatarServer: nomeFoto
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            Perfil();
        } else {
            resposta.text().then(texto => console.error(texto));
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function salvarCor(nomeCor) {
    fetch("/perfil/cor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: Email_Usuario,
            corServer: nomeCor
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            AplicarCor(nomeCor); 
        } else {
            resposta.text().then(texto => console.error(texto));
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function Deslogar() {
    Nome_Usuario = '';
    Email_Usuario = '';
    AplicarCor('gold');
    Home()
}