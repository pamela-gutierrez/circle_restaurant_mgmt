module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        }
    });
    return Items; 
}