'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentTime = new Date()
    await queryInterface.bulkInsert(
      'alunos',
      [
        {
          nome: 'oscar',
          email: 'oscar@aluno.ifpi.br',
          cur_id: 1,

          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'tamires',
          email: 'tamires@aluno.ifpi.br',
          cur_id: 2,

          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'luana',
          email: 'luana@aluno.ifpi.br',
          cur_id: 2,
          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'sabrina',
          email: 'sabrina@aluno.ifpi.br',
          cur_id: 3,

          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'Leandro',
          email: 'leandro@aluno.ifpi.br',
          cur_id: 1,

          createdAt: currentTime,
          updatedAt: currentTime
        }
      ],
      {}
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunos', null, {})
  }
}
