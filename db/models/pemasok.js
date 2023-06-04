'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemasok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pemasok.init({
    name: DataTypes.STRING,
    addres: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pemasok',
  });
  return pemasok;
};