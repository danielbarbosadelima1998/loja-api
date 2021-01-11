const { DataTypes, Model } = require("sequelize");

class Clients extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "clients",
        tableName: "clients",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.orders, { foreignKey: "orderId", as: "order" });
  }
}
module.exports = Clients;
