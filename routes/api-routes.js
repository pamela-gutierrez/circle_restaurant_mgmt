// requiring models
var db = require("../models");

// Routes
module.exports = function(app) {

    // Item(Admin):GET, return all menu items
    app.get("/api/admin/item", function (req, res){
        db.Item.findAll({}).then(function(dbItem){
            res.json(dbItem);
        });
    });

    // Item(Admin):GET, return 1 menu item

    // Item(Admin):POST, create a new menu item

    // Item(Admin):PUT, update a menu item

    // Item(Admin):DELETE, delete a menu item

    // Item(User):GET, return all menu items

    // Item(User):POST, return 1 menu item

    // Orders(User):POST, post item to order

    // Orders(User):PUT, update item in order

    // Orders(User):DELETE, delete item in order

    // Orders(Admin):GET, return all orders

    // Orders(Admin):PUT, update orders to "complete"
}

