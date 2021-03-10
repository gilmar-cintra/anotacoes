'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class languages_levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  languages_levels.init({
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'languages_levels',
  });
  return languages_levels;
};