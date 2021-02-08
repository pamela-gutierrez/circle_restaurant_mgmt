var bcrypt = require("bcryptjs");
// bcrypt hashes passwords in db

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                is: /[a-z]+/,
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
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    // Lines 25-27 are for future models of this application with added logged in roles
    return User;
}