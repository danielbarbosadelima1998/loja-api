const { DataTypes, Model } = require('sequelize')

class Products extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            costPrice: {
                type: DataTypes.DECIMAL(20, 2),
                allowNull: true,
            },
            salePrice: {
                type: DataTypes.DECIMAL(20, 2),
                allowNull: false,
            },
        },
            {
                sequelize,
                modelName: 'products',
                tableName: 'products'
            })
    }
    static associate(models) {
        this.belongsTo(models.categories, {
            foreignKey: 'categoryId', as: 'category',
        })
    }
}
module.exports = Products;