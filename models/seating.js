module.exports = function (sequelize, DataTypes) {
    var Seating = sequelize.define("Seating", {
        occupied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        maxSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
            }
        }
    });

    Seating.associate = function(models) {
        models.Seating.hasMany(models.Orders, {
        });
    }
    return Seating;
};
