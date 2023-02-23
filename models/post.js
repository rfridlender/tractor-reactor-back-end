'use strict';
const tractors = require('../data/tractors.js')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, { as: 'author', foreignKey: 'authorId' })
      Post.hasMany(models.Rating, { as: 'ratings', foreignKey: 'raterId' })
    }
  }
  Post.init({
    variety: {
      type: DataTypes.ENUM(tractors.types),
      allowNull: false,
    },
    brand: {
      type: DataTypes.ENUM(tractors.brands),
      allowNull: false,
    },
    design: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horsepower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    reaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};