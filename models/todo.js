'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'Todos',
  });

  return Todo;
};