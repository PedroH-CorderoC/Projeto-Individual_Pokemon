var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilcontroller");

router.get("/buscar/:email", function (req, res) {
    perfilController.buscarPerfil(req, res);
});

router.put("/cor", function (req, res) {
    perfilController.atualizarCor(req, res);
});

router.put("/avatar", function (req, res) {
    perfilController.atualizarAvatar(req, res);
});

module.exports = router;