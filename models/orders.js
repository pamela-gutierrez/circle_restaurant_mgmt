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
        Orders.belongsTo(models.Seating, {
            foreignKey: {
                allowNull: false
            }
        });
        Orders.hasMany(models.Items, {
            foreignKey: {
                allowNull: false
            }
        });
    };
}