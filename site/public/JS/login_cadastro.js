function Login() {
    resetar()
    login.style.color = 'white'
    login.style.background = 'blue'
    login.style.boxShadow = 'none'
    TelaGrande.innerHTML = `<h2>Bem Vindo Treinador!</h2> <br>
    <h3>Entre na sua conta usando o Email e a senha.</h3><br><br>
    <div class='Caixa-texto'><p>Após o Login Sua Jornada começara e você tera acesso a esse mundo do Pokemon</p></div>`
    TelaBaixa.innerHTML = ` <div class="Login">
                <div class="trocar_cadastro">
                <button id="botao_login" onclick ='Login()'>Login</button> 
                <button id="botao_cadastro" onclick ='Cadastro()'>Cadastro</button> 
                </div><div class='registros'>Entre com Email<input id='ipt_email'></div> 
                <div class='registros'>Entre com a senha<input id='ipt_senha'></div>
                <button class='botao_finalizar' onclick='FinalizarLogin()'>Login</button></div> 
                `
    botao_login.style.background = 'white'
    botao_cadastro.style.background = 'none'
}

function Cadastro() {
    TelaBaixa.innerHTML = ` <div class="Login">
                <div class="trocar_cadastro">
                <button id="botao_login" onclick ='Login()'>Login</button> 
                <button id="botao_cadastro" onclick ='Cadastro()'>Cadastro</button> 
                </div><div class='registros'>Entre com o nome<input id='ipt_treinador'></div>
                <div class='registros'>Entre com Email<input id='ipt_email'></div> 
                <div class='registros'>Entre com a senha<input id='ipt_senha'></div>
                <div class='registros'>Confirmar a senha<input id='ipt_senha_confir'></div>
                <button class='botao_finalizar' onclick='FinalizarCadastro()'>Cadastrar</button></div> 
                `;
    botao_cadastro.style.background = 'white';
    botao_login.style.background = 'none';
}

function FinalizarCadastro() {
    var nomeVar = ipt_treinador.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_senha_confir.value;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      alert("Mensagem de erro para todos os campos em branco")
      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

          alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...")

          setTimeout(() => {
            Login()  
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

function FinalizarLogin() {

    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

        if (emailVar == "" || senhaVar == "") {
            alert('Mensagem de erro para todos os campos em branco')
            finalizarAguardar();
            return false;
        }
        else {
            setInterval(sumirMensagem, 5000)
        }

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    Nome_Usuario = json.nome;
                    Email_Usuario = json.email;

                    setTimeout(function () {
                        Perfil();
                    });

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
  }