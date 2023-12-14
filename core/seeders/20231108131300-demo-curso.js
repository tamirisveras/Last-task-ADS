'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentTime = new Date()
    await queryInterface.bulkInsert(
      'cursos',
      [
        { curso: 'ADS', createdAt: currentTime, updatedAt: currentTime },
        {
          curso: 'Sistemas de informação',
          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          curso: 'Ciências da computação',
          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          curso: 'Engenharia de software',
          createdAt: currentTime,
          updatedAt: currentTime
        }
      ],
      {}
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cursos', null, {})
  }
}
