'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.playlist.belongsToMany(models.exercise, 
        {through: 'playlistExercises',
        as: 'exercises'})
    }
  };
  playlist.init({
        name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};