'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*
    static associate(models) {
      // define association here
      models.Publication.hasMany(models.Comment);
      models.Publication.hasMany(models.Like);
      models.Publication.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }) // Ca me crée un "userId" alors que ça devrait créer une liaison pour "user_idusers"
    }
    */
  };
  Publication.init({
    users_idusers: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};