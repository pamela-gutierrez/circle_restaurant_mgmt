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

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
}