'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class komponen_pemasok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  komponen_pemasok.init({
    id_komponen: DataTypes.INTEGER,
    id_pemasok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'komponen_pemasok',
  });
  return komponen_pemasok;
};