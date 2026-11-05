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
                <button class='botao_finalizar' onclick='Finalizar()'>Login</button></div> 
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
                <button class='botao_finalizar' onclick='Finalizar()'>Cadastrar</button></div> 
                `;
    botao_cadastro.style.background = 'white';
    botao_login.style.background = 'none';
}

function Finalizar() {
    
}