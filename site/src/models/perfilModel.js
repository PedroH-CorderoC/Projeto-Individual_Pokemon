var database = require("../database/config");

function buscarPerfil(email) {
    var instrucaoSql = `SELECT Nome AS nome,
                        DATE_FORMAT(Data_cadastro, '%d/%m/%Y') AS dtRegistro,
                        Foto_perfil AS FotoPerfil,
                        Cor_console AS CorConsole
                        FROM Usuario
                        WHERE Email = '${email}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarAvatar(email, avatar) {
    var instrucaoSql = `UPDATE Usuario SET Foto_perfil = '${avatar}' WHERE Email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarCor(email, cor) {
    var instrucaoSql = `UPDATE Usuario SET Cor_console = '${cor}' WHERE Email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { 
    buscarPerfil,
    atualizarAvatar,
    atualizarCor
};