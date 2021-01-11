const { DataTypes, Model } = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "users"
      }
    );
  }
  static associate(models) {
    this.hasMany(models.sales, { foreignKey: "saleId", as: "sale" });
  }
}

module.exports = Users;
