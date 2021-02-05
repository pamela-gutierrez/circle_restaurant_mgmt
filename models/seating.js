module.exports = function (sequelize, DataTypes) {
    var Seating = sequelize.define("Seating", {
        occupied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        maxSeats: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: true,
            }
        }
    });
}