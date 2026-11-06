var database = require("../database/config");

function buscarPerfil(email) {
    var instrucaoSql = `SELECT nome,
                        DATE_FORMAT(Data_cadastro, '%d/%m/%Y') AS dtRegistro
                        FROM usuario
                        WHERE email = '${email}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { buscarPerfil };