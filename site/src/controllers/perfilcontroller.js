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

function atualizarAvatar(req, res) {
    var email = req.body.emailServer;
    var avatar = req.body.avatarServer;

    perfilModel.atualizarAvatar(email, avatar).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarCor(req, res) {
    var email = req.body.emailServer;
    var cor = req.body.corServer;

    perfilModel.atualizarCor(email, cor).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { 
    buscarPerfil,
    atualizarCor,
    atualizarAvatar
};