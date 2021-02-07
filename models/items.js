module.exports = function (sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                is: /^[a-z]+$/i,
                len: [1, 50]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                is: /^[a-z]+$/i,
                len: [1, 50]
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                is: /^[a-z]+$/i,
                len: [1, 140]
            }
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            validate: {
                notEmpty: true
            }
        }
    });

    Items.associate = function(models) {
        Items.belongsTo(models.Orders, {
        });
    }
    
    return Items;
};

