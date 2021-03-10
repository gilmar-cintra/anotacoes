'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class networks_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  networks_types.init({
    network: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'networks_types',
  });
  return networks_types;
};