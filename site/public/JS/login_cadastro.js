let email_validos = ['@gmail.com', '@sptech.school']
let caracter_nescessarios = ['#', '@', '$', '&', '.', ',', ':', ';', '!', '?']
let numeros_nescessarios = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
let letras_nescessarios = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


function Login() {
    resetar()
    login.style.color = 'white'
    login.style.background = 'blue'
    login.style.boxShadow = 'none'
    TelaGrande.innerHTML = `<h2>Bem Vindo Treinador!</h2> <br>
    <h3>Entre na sua conta usando o Email e a senha.</h3><br><br>
    <div class='Caixa-texto'><p>Após o Login Sua Jornada começara e você tera acesso a esse mundo Pokemon</p></div>`
    TelaBaixa.innerHTML = ` <div class="Login">
                <div class="trocar_cadastro">
                <button id="botao_login" onclick ='Login()'>Login</button> 
                <button id="botao_cadastro" onclick ='Cadastro()'>Cadastro</button> 
                </div><div class='registros'>Entre com Email<input id='ipt_email'></div> 
                <div class='registros'>Entre com a senha<input id='ipt_senha'></div>
                <div id='msg' class='mensagem'></div>
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
                <div id='msg' class='mensagem'></div>
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
    
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      msg.innerHTML =`Preencha Todos os Campos`;
      return;
    } else if (senhaVar != confirmacaoSenhaVar) {
      msg.innerHTML =`Senhas diferentes`;
      return;
    } 
    
    if (senhaVar.length > 45) {
      msg.innerHTML =`Senha muito grande`;
      return;
    } 
    if (emailVar.length > 45) {
      msg.innerHTML =`Email muito grande`;
      return;
    } 
    if (nomeVar.length > 45) {
      msg.innerHTML =`Nome muito grande`;
      return;
    } 

    let Caracter_colocado = false;
    let Numero_colocado = false;
    let Letra_colocado = false;
    let Letra_Maiusculas_colocado = false;
    let Email_valido = false;

    for (let contador = 0; contador < email_validos.length; contador++) {
     if (emailVar.includes(email_validos[contador]) ==  true) {
      Email_valido = true;
     }
    }

    for (let contador = 0; contador < caracter_nescessarios.length; contador++) {
      if (senhaVar.includes(caracter_nescessarios[contador]) ==  true) {
      Caracter_colocado = true;
     }
    }

    for (let contador = 0; contador < numeros_nescessarios.length; contador++) {
      if (senhaVar.includes(numeros_nescessarios[contador]) ==  true) {
      Numero_colocado = true;
     }
    }

    for (let contador = 0; contador < letras_nescessarios.length; contador++) {
      if ((senhaVar.toLowerCase()).includes(letras_nescessarios[contador]) ==  true) {
      Letra_colocado = true;
     }
    }

    
    for (let contador = 0; contador < senhaVar.length; contador++) {
      let letra = senhaVar[contador];
      if (letras_nescessarios.includes(letra.toLowerCase()) && letra == letra.toUpperCase()) {
      Letra_Maiusculas_colocado = true;
      }
    }

    if (Letra_colocado == false) {
      msg.innerHTML = `Senha deve conter letras`;
      return;
    } else if (Letra_Maiusculas_colocado == false) {
      msg.innerHTML = `Senha tem que ter letras maiúsculas`
      return;
    } else if (Email_valido == false) {
      msg.innerHTML = `Email invalido. Use gmail ou sptech.school`;
      return;
    } else if (senhaVar.length < 8) {
      msg.innerHTML =`Senha tem que ter 8 carateres`;
      return;
    } else if (Numero_colocado == false || Caracter_colocado == false) {
      msg.innerHTML =`Senha precisa de Caracter Especial e Numero`;
      return;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

          msg.innerHTML = `Cadastro realizado com sucesso! Redirecionando para tela de Login...`

          setTimeout(() => {
            Login()  
          }, "2000");
          
        } else {
          resposta.text().then(function (texto) {
            msg.innerHTML =texto;  
        })
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        
      });
    return;
  }

function FinalizarLogin() {

    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

        if (emailVar == "" || senhaVar == "") {
            msg.innerHTML = `Mensagem de erro para todos os campos em branco`
            return;
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
                    msg.innerHTML = texto;
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return;
}