const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuariosController {
  static async cadastrar(request, response) {
    try {
      const { nome, email, senha } = request.body;
      const usuarioExistente = await database.usuarios.findOne({
        where: {
          email: email,
        },
      });

      if (usuarioExistente) {
        return response.status(400).json({
          message: 'E-mail já Cadastrado!',
        });
      }

      const senhaHash = await hash(senha, 10);
      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: nome,
        email: email,
        senha: senhaHash,
      });

      return response.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Erro Interno do Servidor',
      });
    }
  }

  static async buscarUsuarios(request, response) {
    try {
      const usuarios = await database.usuarios.findAll();

      if (!usuarios || usuarios.length === 0) {
        return response.status(404).json({ message: 'Nenhum Usuário Encontrado' });
      }

      return response.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro Interno do Servidor' });
    }
  }

  static async buscarPorId(request, response) {
    try {
      const { id } = request.params;
      const usuario = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      if (!usuario) {
        return response.status(404).json({ message: 'Usuário não Encontrado' });
      }

      return response.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Erro Interno do Servidor',
      });
    }
  }

  static async editarUsuario(request, response) {
    try {
      const { id } = request.params;
      const { nome, email } = request.body;
      const usuario = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      if (!usuario) {
        return response.status(404).json({
          message: 'Usuário não Encontrado',
        });
      }

      usuario.nome = nome;
      usuario.email = email;
      await usuario.save();

      return response.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Erro Interno do Servidor',
      });
    }
  }

  static async removerUsuario(request, response) {
    try {
      const { id } = request.params;
      await database.usuarios.destroy({
        where: {
          id: id,
        },
      });

      return response.status(200).send({ message: 'Usuário Deletado com Sucesso!' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro Interno do Servidor' });
    }
  }
}

module.exports = UsuariosController;
