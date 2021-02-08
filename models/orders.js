module.exports = function (sequelize, DataTypes) {
    var Orders = sequelize.define("Orders", {
        submitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        item_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    });

    Orders.associate = function(models) {
        models.Orders.belongsTo(models.Seating, {
            foreignKey: {
                allowNull: false,
                constraints: false,
            }
        });
        models.Orders.hasMany(models.ItemOrders, {
        });
    };
    return Orders;
}
