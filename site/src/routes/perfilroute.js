var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilcontroller");

router.get("/buscar/:email", function (req, res) {
    perfilController.buscarPerfil(req, res);
});

module.exports = router;