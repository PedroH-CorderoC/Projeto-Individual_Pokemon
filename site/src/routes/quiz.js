var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/listar", function (req, res) {
    quizController.listar(req, res);
});

router.get("/perguntas/:idQuiz", function (req, res) {
    quizController.buscarPerguntas(req, res);
});

router.post("/registrar", function (req, res) {
    quizController.registrarQuiz(req, res);
});

router.get("/qtd-tentativas/:email", function (req, res) {
    quizController.qtdTentativas(req, res);
});

router.get("/maior-pontuacao/:email", function (req, res) {
    quizController.maiorPontuacao(req, res);
});

router.get("/ultima-tentativa/:email", function (req, res) {
    quizController.ultimaTentativa(req, res);
});

router.get("/acertos-erros/:email", function (req, res) {
    quizController.obterAcertosErrosUltimaTentativa(req, res);
});

router.get("/grafico-barras/:email", function (req, res) {
    quizController.obterGraficoBarras(req, res);
});

router.get("/historico/:email", function (req, res) {
    quizController.obterPontuacoesPorTentativa(req, res);
});

router.get("/evolucao/:email", function (req, res) {
    quizController.evolucao(req, res);
});

router.get("/resumo/:email", function (req, res) {
    quizController.resumoQuizzes(req, res);
});

module.exports = router;