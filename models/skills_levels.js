'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skills_levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  skills_levels.init({
    skill: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'skills_levels',
  });
  return skills_levels;
};