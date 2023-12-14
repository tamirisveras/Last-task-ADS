const { curso, aluno } = require('../models');

class CursoController {
  static async getCursos(request, response) {
    try {
      const cursos = await curso.findAll();
      return response.status(200).json(cursos);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  static async getCursoPorId(request, response) {
    const { id } = request.params;
    try {
      const cursoEncontrado = await curso.findOne({ where: { id: Number(id) } });
      return response.status(200).json(cursoEncontrado);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  static async postCurso(request, response) {
    const novoCurso = request.body;
    try {
      const novoCursoEnviado = await curso.create(novoCurso);
      return response.status(200).json(novoCursoEnviado);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  static async putCurso(request, response) {
    const novosDados = request.body;
    const { id } = request.params;
    try {
      await curso.update(novosDados, { where: { id: Number(id) } });
      const cursoAtualizado = await curso.findOne({ where: { id: Number(id) } });
      return response.status(200).json(cursoAtualizado);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  static async deleteCurso(request, response) {
    const { id } = request.params;
    try {
      await curso.destroy({ where: { id: Number(id) } });
      return response.status(200).json({
        message: `Curso ${id} deletado com sucesso!`
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  static async getAlunosPorCurso(request, response) {
    const { id } = request.params;
    try {
      const alunos = await aluno.findAll({
        where: { cur_id: Number(id) }
      });
      return response.status(200).json(alunos);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = CursoController;
