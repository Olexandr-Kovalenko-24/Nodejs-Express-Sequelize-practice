'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Superhero.hasMany(models.Image, {
        foreignKey: 'superheroId'
      });
      Superhero.belongsToMany(models.Superpower, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'superheroId'
      })
    }
  }
  Superhero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    realName: {
      field: 'real_name',
      type: DataTypes.STRING
    },
    catchPhrase: {
      field: 'catch_phrase',
      type: DataTypes.STRING,
    },
    originDescription: {
      field: 'origin_description',
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheroes',
    underscored: true
  });
  return Superhero;
};