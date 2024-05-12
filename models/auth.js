const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "AuthToken",
    {
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      expiryDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "AuthTokens",
      modelName: "AuthToken",
    },
  );

  sequelize
    .model("AuthToken")
    .belongsTo(sequelize.model("User"), { foreignKey: "userId" });

  sequelize.model("AuthToken").createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(
      expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRATION,
    );
    let _token = uuidv4();
    let refreshToken = await sequelize.model("AuthToken").create({
      token: _token,
      user: user.id,
      expiryDate: expiredAt.getTime(),
    });
    return refreshToken.token;
  };

  sequelize.model("AuthToken").findToken = async function (token) {
    return await sequelize.model("AuthToken").findOne({
      where: {
        token: token,
      },
    });
  };

  sequelize.model("AuthToken").verifyExpiration = async function (token) {
    let refreshToken = await sequelize.model("AuthToken").findToken(token);
    if (refreshToken.expiryDate < new Date().getTime()) {
      return false;
    }
    return true;
  };
};
