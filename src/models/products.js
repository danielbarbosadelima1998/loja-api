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
            categoryId: {
                type: DataTypes.UUID,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        },
            {
                sequelize,
                modelName: 'products',
                tableName: 'products'
            })
    }
    static associate(models) {
        this.hasOne(models.categories, {
            foreignKey: 'id', as: 'category', through:'products_categories'
        })
    }
}
module.exports = Products;