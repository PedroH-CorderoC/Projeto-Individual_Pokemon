var quizModel = require("../models/quizModel");

function listar(req, res) {
    quizModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function registrarQuiz(req, res) {
    var fkusuario = req.body.FkUsuario;
    var Pontuacao = req.body.pontuacao;

    if (Pontuacao == undefined) {
        res.status(400).send("A pontuação está indefinido!");
    } else if (fkusuario == undefined) {
        res.status(400).send("O usuario está indefinido!");
    }
        else {
        quizModel.registrarQuiz(fkusuario, Pontuacao)
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
    var idUsuario = req.params.idUsuario;

    quizModel.buscarQtdTentativas(idUsuario).then(resultado => {
        res.json(resultado[0]);
    }).catch(erro => {
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

function maiorPontuacao(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.buscarMaiorPontuacao(idUsuario).then(resultado => {
        res.json(resultado[0]);
    }).catch(erro => {
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

function ultimaTentativa(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.buscarUltimaTentativa(idUsuario).then(resultado => {
        res.json(resultado[0]);
    }).catch(erro => {
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

function obterAcertosErrosUltimaTentativa(req, res) {
  const idUsuario = req.params.id;

  quizModel.obterAcertosErrosUltimaTentativa(idUsuario)
    .then(resultado => {
      if (resultado.length > 0) {
        res.json({
          acertos: resultado[0].qtdacertos,
          erros: resultado[0].erros
        });
      } else {
        res.status(404).json({ mensagem: "Nenhuma tentativa encontrada." });
      }
    })
    .catch(erro => {
      console.error("Erro ao buscar acertos e erros:", erro);
      res.status(500).json(erro);
    });
}

function obterGraficoBarras(req, res) {
  const idUsuario = req.params.id;

  quizModel.obterTentativasEPontuacao(idUsuario)
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
      res.status(500).json(erro);
    });
}

function obterGraficoHistorico(req, res) {
    const idUsuario = req.params.idUsuario;

    dashboardModel.obterPontuacoesPorTentativa(idUsuario)
        .then(resultado => {
            res.status(200).json(resultado);
        }).catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterPontuacoesPorTentativa(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.obterPontuacoesPorTentativa(idUsuario)
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

module.exports = {
    listar,
    registrarQuiz,
    qtdTentativas,
    maiorPontuacao,
    ultimaTentativa,
    obterAcertosErrosUltimaTentativa,
    obterGraficoBarras,
    obterGraficoHistorico,
    obterPontuacoesPorTentativa
}