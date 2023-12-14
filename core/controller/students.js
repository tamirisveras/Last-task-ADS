const database = require('../models');

class AlunoController {
  static async getAlunos(request, response) {
    try {
      const alunos = await database.aluno.findAll({
        include: [{
          model: database.curso,
          attributes: ['curso'],
        }],
      });

      return response.status(200).json(alunos);
    } catch (error) {
      return response.status(500).json({ message: error.message || 'Erro Interno do Servidor!' });
    }
  }

  static async getAlunoPorId(request, response) {
    const { id } = request.params;
    try {
      const aluno = await database.aluno.findOne({ where: { id: Number(id) } });
      return response.status(200).json(aluno);
    } catch (error) {
      return response.status(500).json({ Message: error.message || 'Erro Interno do Servidor!' });
    }
  }

  static async postAluno(request, response) {
    const novoAluno = request.body;
    try {
      const existingAluno = await database.aluno.findOne({
        where: { email: novoAluno.email },
      });

      if (existingAluno) {
        return response.status(400).json({ Message: 'E-mail já existe' });
      }

      const novoAlunoEnviado = await database.aluno.create(novoAluno);
      return response.status(200).json(novoAlunoEnviado);
    } catch (error) {
      return response.status(500).json({ Message: error.message || 'Erro Interno do Servidor!' });
    }
  }

  static async putAluno(request, response) {
    const novosDados = request.body;
    const { id } = request.params;
    try {
      const existingAluno = await database.aluno.findOne({
        where: { email: novosDados.email, id: { [database.Sequelize.Op.not]: Number(id) } },
      });

      if (existingAluno) {
        return response.status(400).json({ Message: 'E-mail já existe' });
      }

      await database.aluno.update(novosDados, { where: { id: Number(id) } });
      const aluno = await database.aluno.findOne({ where: { id: Number(id) } });
      return response.status(200).json(aluno);
    } catch (error) {
      return response.status(500).json({ Message: error.message || 'Erro Interno do Servidor!' });
    }
  }

  static async deleteAluno(request, response) {
    const { id } = request.params;
    try {
      await database.aluno.destroy({ where: { id: Number(id) } });
      return response.status(200).json({
        messagem: `${id} Deletado com Sucesso`,
      });
    } catch (error) {
      return response.status(500).json({ Message: error.message || 'Erro Interno do Servidor!' });
    }
  }
}

module.exports = AlunoController;
