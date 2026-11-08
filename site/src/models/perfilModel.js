var database = require("../database/config");

function buscarPerfil(email) {
    var instrucaoSql = `SELECT nome,
                        DATE_FORMAT(Data_cadastro, '%d/%m/%Y') AS dtRegistro,
                        Foto_perfil as FotoPerfil,
                        Cor_console as CorConsole
                        FROM usuario
                        WHERE email = '${email}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarAvatar(email, avatar) {
    var instrucaoSql = `UPDATE usuario SET Foto_perfil = '${avatar}' WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarCor(email, cor) {
    var instrucaoSql = `UPDATE usuario SET Cor_console = '${cor}' WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { 
    buscarPerfil,
    atualizarAvatar,
    atualizarCor
};