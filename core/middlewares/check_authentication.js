const { verify, decode } = require("jsonwebtoken")
const jsonSecret = require("../config/jsonSecret.js")

module.exports = async (request, response, next) => {
    const token = request.headers.authorization

    if (!token) {
        return response.status(401).send("Token não fornecido")
    }

    const [bearer, accessToken] = token.split(" ")

    try {
        verify(accessToken, jsonSecret.secret)
        const { id, email } = await decode(accessToken)
        request.usuarioId = id
        request.usuarioEmail = email
        return next()
    } catch (err) {
        return response.status(401).send("Token inválido")
    }
}