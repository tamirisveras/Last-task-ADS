'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      curso.hasMany(models.aluno, {
        foreignKey: 'cur_id'
      })
    }
  }
  curso.init(
    {
      curso: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'curso'
    }
  )
  return curso
}
