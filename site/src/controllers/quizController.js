var quizModel = require("../models/quizModel");

function listar(req, res) {
    quizModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPerguntas(req, res) {
    var idQuiz = Number(req.params.idQuiz);

    if (isNaN(idQuiz)) {
        res.status(400).send("O quiz é inválido!");
        return;
    }

    quizModel.buscarPerguntas(idQuiz)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma pergunta encontrada!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function registrarQuiz(req, res) {
    var email = req.body.emailServer;
    var idQuiz = Number(req.body.idQuizServer);
    var pontos = Number(req.body.pontosServer);

    if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (isNaN(idQuiz)) {
        res.status(400).send("O quiz está indefinido!");
    } else if (isNaN(pontos)) {
        res.status(400).send("A pontuação está indefinida!");
    } else {
        quizModel.registrarQuiz(email, idQuiz, pontos)
            .then(function (resultado) {
                    res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o registro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function qtdTentativas(req, res) {
    var email = req.params.email;

    quizModel.buscarQtdTentativas(email).then(resultado => {
        res.json(resultado[0]);
    }).catch(erro => {
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

function maiorPontuacao(req, res) {
    var email = req.params.email;

    quizModel.buscarMaiorPontuacao(email).then(resultado => {
        res.json(resultado[0]);
    }).catch(erro => {
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

function ultimaTentativa(req, res) {
    var email = req.params.email;

    quizModel.buscarUltimaTentativa(email).then(resultado => {
        res.json(resultado[0]);
    }).catch(erro => {
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

function obterAcertosErrosUltimaTentativa(req, res) {
    var email = req.params.email;

    quizModel.obterAcertosErrosUltimaTentativa(email)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json({
                    acertos: resultado[0].acertos,
                    erros: resultado[0].erros
                });
            } else {
                res.status(404).json({ mensagem: "Nenhuma tentativa encontrada." });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar acertos e erros:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterGraficoBarras(req, res) {
    var email = req.params.email;

    quizModel.obterTentativasEPontuacao(email)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json({
                    tentativas: resultado[0].tentativas,
                    maiorPontuacao: resultado[0].maiorPontuacao
                });
            } else {
                res.status(404).json({ mensagem: "Dados não encontrados." });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar dados do gráfico de barras:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterPontuacoesPorTentativa(req, res) {
    var email = req.params.email;

    quizModel.obterPontuacoesPorTentativa(email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as pontuações por tentativa: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function evolucao(req, res) {
    quizModel.obterEvolucao(req.params.email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function resumoQuizzes(req, res) {
    quizModel.obterResumoQuizzes(req.params.email)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    buscarPerguntas,
    registrarQuiz,
    qtdTentativas,
    maiorPontuacao,
    ultimaTentativa,
    obterAcertosErrosUltimaTentativa,
    obterGraficoBarras,
    obterPontuacoesPorTentativa,
    evolucao,
    resumoQuizzes
}