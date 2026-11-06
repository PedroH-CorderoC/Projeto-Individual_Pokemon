var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/tentativas/:idUsuario", quizController.qtdTentativas);
router.get("/pontuacao/:idUsuario", quizController.maiorPontuacao);
router.get("/ultima/:idUsuario", quizController.ultimaTentativa);
router.get("/graficoPizza/:id", quizController.obterAcertosErrosUltimaTentativa);
router.get("/graficoBarras/:id", quizController.obterGraficoBarras);
router.get("/grafico-historico/:idUsuario", quizController.obterGraficoHistorico);
router.get("/pontuacoes/:idUsuario", quizController.obterPontuacoesPorTentativa);


module.exports = router;
