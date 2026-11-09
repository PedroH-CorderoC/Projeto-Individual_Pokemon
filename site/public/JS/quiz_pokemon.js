function Quiz() {
    resetar()
    quiz_pokemon.style.color = 'white'
    quiz_pokemon.style.background = 'blue'
    quiz_pokemon.style.boxShadow = 'none'

    if (Nome_Usuario == '') {
        TelaGrande.innerHTML = `<div class="Sem-Cadastro"><h1>Para Ter uma experiencia completa é necessario fazer o seu cadastro de Treinador</h1><br>
                      <h3>Faça o Login para começar a jornada e completar todos os ginasios</h3></div>`

        TelaBaixa.innerHTML = `<div class="Sem-Cadastro"><b>Você ainda não entrou</b>
                            <p>Seu progresso não será iniciado.</p>
                            <button class='botao' onclick="Login()">Entrar ou cadastrar</button></div>`
    } else {

        TelaGrande.innerHTML = `<h1>Selecione o Ginasio que irá enfrentar</h1><br><div class="Tipos-Quiz" id='TipoQuiz'></div>`

        TelaBaixa.innerHTML = `<div class="Home-Pequeno"><h4>Os Ginasios Estão te esperando Treinador</h4><br><h2>${Nome_Usuario}</h2><br> Selecione quem irá enfrentar</div>`

        fetch(`/quiz/listar`, {
            method: "GET"
        }).then(function (resultado) {
            console.log("ESTOU NO THEN DO Listar()!")

            if (resultado.ok) {
                console.log(resultado);

                resultado.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (let contador = 0; contador < json.length; contador++) {
                    document.getElementById("TipoQuiz").innerHTML +=
                    `<div class='Card-Quiz ${json[contador].Categoria}_Quiz' onclick="iniciarQuiz(${json[contador].idQuiz})">
                        <h3>${json[contador].Categoria}</h3>
                        <p>${json[contador].Descricao}</p>
                    </div>`;   
                    }
                });

            } else {
                console.log("Houve um erro ao buscar o perfil!");

                resultado.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })
    }
    }

let Perguntas_Quiz = [];
let Pergunta_Atual = 0;
let Acertos = 0;
let Id_Quiz_Atual = 0;

function iniciarQuiz(idQuiz) {
    Id_Quiz_Atual = idQuiz;
    Pergunta_Atual = 0;
    Acertos = 0;

    fetch(`/quiz/perguntas/${idQuiz}`, {
        method: "GET"
    }).then(function (resposta) {
        if (resposta.status === 200) {
            resposta.json().then(json => {
                Perguntas_Quiz = json;
                mostrarPergunta();
            });
        } else {
            resposta.text().then(texto => console.error(texto));
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function mostrarPergunta() {
    let p = Perguntas_Quiz[Pergunta_Atual];

    TelaGrande.innerHTML = `
        <h3>Pergunta ${Pergunta_Atual + 1} de ${Perguntas_Quiz.length}</h3>
        <h2>${p.Peergunta}</h2>`;

    TelaBaixa.innerHTML = `
        <div class='Alternativas'><div class='Selecionar'><h2>X</h2><button class="Alternativa">${p.Alternativa_a}</button></div>
        <div class='Selecionar'><h2>Y</h2><button class="Alternativa">${p.Alternativa_b}</button></div>
        <div class='Selecionar'><h2>A</h2><button class="Alternativa">${p.Alternativa_c}</button></div>
        <div class='Selecionar'><h2>B</h2><button class="Alternativa">${p.Alternativa_d}</button></div></div>`;
}

function responder(letra) {
    if (letra == Perguntas_Quiz[Pergunta_Atual].Correta) {
        Acertos++;
    }

    Pergunta_Atual++;

    if (Pergunta_Atual < Perguntas_Quiz.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    TelaGrande.innerHTML = `
        <h1>Fim do desafio!</h1><br>
        <h3>Você acertou ${Acertos} de ${Perguntas_Quiz.length}</h3>`;
    TelaBaixa.innerHTML = `<h3 class='Finalizacao_Quiz'>Escolher outro ginásio clicando no Start ou no Select a direita<br> ---></h3>`;

    fetch("/quiz/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: Email_Usuario,
            idQuizServer: Id_Quiz_Atual,
            pontosServer: Acertos
        })
    }).then(function (resposta) {
        if (!resposta.ok) {
            resposta.text().then(texto => console.error(texto));
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}