var db = require("../models");

module.exports = function(app) {
    app.get("/api/admin/item", function (req, res){
        db.Item.findAll({}).then(function(dbItem){
            res.json
        });
    });
}

