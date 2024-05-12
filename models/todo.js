const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Todo",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: DataTypes.STRING,
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      due_date: {
        type: DataTypes.DATE,
      },
      tags: DataTypes.ARRAY(DataTypes.STRING),
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      tableName: "Todos",
      modelName: "Todo",
    },
  );
};
