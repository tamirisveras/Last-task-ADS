const { Router } = require("express")
const usuariosController = require("../controller/user")
const router = Router()

router.post("/usuarios", usuariosController.cadastrar)
    .get("/usuarios", usuariosController.buscarUsuarios)
    .get("/usuarios/:id", usuariosController.buscarPorId)
    .put("/usuarios/:id", usuariosController.editarUsuario)
    .delete("/usuarios/:id", usuariosController.removerUsuario)

module.exports = router