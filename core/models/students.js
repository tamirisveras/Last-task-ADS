'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      aluno.belongsTo(models.curso, {
        foreignKey: 'cur_id'
      })
    }
  }
  aluno.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'aluno'
    }
  )
  return aluno
}
