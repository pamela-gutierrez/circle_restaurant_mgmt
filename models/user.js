var bcrypt = require("bcryptjs");
// bcrypt hashes passwords in db

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                is: /^[a-z]+$/i,
                len: [1, 50]
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        }
    });
}