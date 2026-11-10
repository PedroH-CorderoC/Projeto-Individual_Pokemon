var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT idQuiz, Categoria, Descricao FROM Quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPerguntas(idQuiz) {
    var instrucao = `
        SELECT idPerguntas, Peergunta,
               Alternativa_a, Alternativa_b, Alternativa_c, Alternativa_d,
               Correta
        FROM Perguntas
        WHERE FkQuiz = ${idQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function registrarQuiz(email, idQuiz, acertos) {
    var instrucao = `
        INSERT INTO tentativas (FkUsuario, FkQuiz, idTentativa, acertos)
        SELECT u.idUsuario,
               ${idQuiz},
               (SELECT COALESCE(MAX(t.idTentativa), 0) + 1
                FROM tentativas t
                WHERE t.FkUsuario = u.idUsuario AND t.FkQuiz = ${idQuiz}),
               ${acertos}
        FROM Usuario u
        WHERE u.Email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQtdTentativas(email) {
    var instrucao = `
        SELECT COUNT(*) AS tentativas
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        WHERE u.Email = '${email}';
    `;
    return database.executar(instrucao);
}

function buscarMaiorPontuacao(email) {
    var instrucao = `
        SELECT MAX(t.acertos) AS maiorPontuacao
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        WHERE u.Email = '${email}';
    `;
    return database.executar(instrucao);
}

function obterTentativasEPontuacao(email) {
    var instrucao = `
        SELECT COUNT(*) AS tentativas,
               MAX(t.acertos) AS maiorPontuacao
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        WHERE u.Email = '${email}';
    `;
    return database.executar(instrucao);
}

function buscarUltimaTentativa(email) {
    var instrucao = `
        SELECT DATE_FORMAT(MAX(t.data_realizacao), '%d/%m/%Y') AS ultimaTentativa
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        WHERE u.Email = '${email}';
    `;
    return database.executar(instrucao);
}

function obterAcertosErrosUltimaTentativa(email) {
    var instrucao = `
        SELECT t.acertos,
               (SELECT COUNT(*) FROM Perguntas p WHERE p.FkQuiz = t.FkQuiz) - t.acertos AS erros
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        WHERE u.Email = '${email}'
        ORDER BY t.data_realizacao DESC, t.idTentativa DESC
        LIMIT 1;
    `;
    return database.executar(instrucao);
}

function obterPontuacoesPorTentativa(email) {
    var instrucao = `
        SELECT q.Categoria,
               t.idTentativa AS tentativa,
               t.acertos,
               DATE_FORMAT(t.data_realizacao, '%d/%m %H:%i') AS momento
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        JOIN Quiz q ON q.idQuiz = t.FkQuiz
        WHERE u.Email = '${email}'
        ORDER BY t.data_realizacao DESC, t.idTentativa DESC
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterEvolucao(email) {
    var instrucao = `
        SELECT q.Categoria,
               t.idTentativa AS tentativa,
               t.acertos
        FROM tentativas t
        JOIN Usuario u ON u.idUsuario = t.FkUsuario
        JOIN Quiz q ON q.idQuiz = t.FkQuiz
        WHERE u.Email = '${email}'
        ORDER BY q.idQuiz, t.idTentativa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterResumoQuizzes(email) {
    var instrucao = `
        SELECT q.idQuiz,
               q.Categoria,
               (SELECT COUNT(*) FROM Perguntas p WHERE p.FkQuiz = q.idQuiz) AS totalPerguntas,
               COUNT(t.idTentativa) AS tentativas,
               COALESCE(MAX(t.acertos), 0) AS melhor,
               COALESCE(SUM(t.acertos), 0) AS somaAcertos
        FROM Quiz q
        LEFT JOIN tentativas t
               ON t.FkQuiz = q.idQuiz
              AND t.FkUsuario = (SELECT idUsuario FROM Usuario WHERE Email = '${email}')
        GROUP BY q.idQuiz, q.Categoria
        ORDER BY q.idQuiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    buscarPerguntas,
    registrarQuiz,
    buscarQtdTentativas,
    buscarMaiorPontuacao,
    buscarUltimaTentativa,
    obterAcertosErrosUltimaTentativa,
    obterTentativasEPontuacao,
    obterPontuacoesPorTentativa,
    obterEvolucao,
    obterResumoQuizzes
};