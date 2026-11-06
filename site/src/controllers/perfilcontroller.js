var perfilModel = require("../models/perfilModel");

function buscarPerfil(req, res) {
    var email = req.params.email;

    perfilModel.buscarPerfil(email).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { buscarPerfil };