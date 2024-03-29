const { DataTypes, Model } = require('sequelize')

class Categories extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
            {
                sequelize,
                modelName: 'categories',
                tableName: 'categories',
            })
    }
    static associate(models) {
        this.hasMany(models.products, { foreignKey: 'categoryId', as: 'product'})
    }
}
module.exports = Categories;