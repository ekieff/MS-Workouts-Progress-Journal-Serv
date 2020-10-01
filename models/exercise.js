'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.exercise.belongsToMany(models.playlist, {
        through: 'playlistExercises',
      as: 'playlists'})
    }
  };
  exercise.init({
    exerciseTitle: DataTypes.STRING,
    type: DataTypes.STRING,
    videoAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exercise',
  });
  return exercise;
};