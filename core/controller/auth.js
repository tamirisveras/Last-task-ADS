const { compare } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { usuarios } = require("../models");

class AuthController {
  static async login(request, response) {
    try {
      const { email, senha } = request.body;

      if (!email || !senha) {
        return response.status(400).json({ message: "Email e senha são obrigatórios" });
      }

      const usuario = await usuarios.findOne({
        attributes: ["id", "email", "senha"],
        where: { email: email }
      });

      if (!usuario) {
        return response.status(401).json({ message: "Usuário não cadastrado!" });
      }

      const comparacao = await compare(senha, usuario.senha);

      if (!comparacao) {
        return response.status(401).json({ message: "Usuário ou senha incorretos!" });
      }

      const accessToken = sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        jsonSecret.secret,
        {
          expiresIn: 86400,
        }
      );

      response.status(200).json({ accessToken });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Ocorreu um Erro Durante a Autenticação!" });
    }
  }

  static async verifyToken(request, response) {
    try {
      const token = request.headers.authorization;

      if (!token) {
        return response.status(401).json({ message: 'Token não fornecido!' });
      }

      const [bearer, accessToken] = token.split(" ");
      const decodedToken = verify(accessToken, jsonSecret.secret);

      response.status(200).json({ valid: true });
    } catch (error) {
      response.status(401).json({ valid: false });
    }
  }
}

module.exports = AuthController;
