'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk_komponen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  produk_komponen.init({
    id_produk: DataTypes.INTEGER,
    id_komponen: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'produk_komponen',
  });
  return produk_komponen;
};