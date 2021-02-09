module.exports = function (sequelize, DataTypes) {
    var ItemOrders = sequelize.define("ItemOrders", {
        item_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    });


    ItemOrders.associate = models => {
        models.ItemOrders.belongsTo(models.Items, { 
            foreignKey: {
                allowNull: false,
                constraints: false,
            }
        });
        models.ItemOrders.belongsTo(models.Orders, {
            foreignKey: {
                allowNull: false,
                constraints: false,
            }
        });

    }

    return ItemOrders;

}