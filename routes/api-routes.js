// requiring models
var db = require("../models");
var passport = require("..config/passport.js");

// Routes
module.exports = function(app) {

    app.post("/api/admin", passport.authenticate("local"), function(req, res) {
        res.json(req.User);
      });
    
    // Item(Admin):GET, return all menu items
    app.get("/api/admin/item", function (req, res){
        db.Item.findAll({}).then(function(dbItem){
            res.json(dbItem);
        });
    });

    // Item(Admin):GET, return 1 menu item
    app.get("/api/admin/item/:id", function (req, res){
        db.Item.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbItem){
            res.json(dbItem)
        });
    });

    // Item(Admin):POST, create a new menu item
    app.post("/api/admin/item/:id", function(req, res) {
        db.Item.create({
            name: req.body.name,
            category: req.body.category,
            cost: req.body.cost,
            description: req.body.description
        }).then(function(dbItem){
            res.json(dbItem)
        });
    });

    // Item(Admin):PUT, update a menu item
    app.put("/api/admin/item/:id", function(req, res) {
        db.Item.update({
            name: req.body.name,
            category: req.body.category,
            cost: req.body.cost,
            description: req.body.description
        }, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbItem){
                res.json(dbItem)
            });
    });

    // Item(Admin):DELETE, delete a menu item
    app.delete("/api/admin/menu/:id", function(req, res) {
        db.Item.destroy({
            where: {
                id: req.params.id 
            }
        }).then(function(dbItem){
            res.json(dbItem)
        });
    });

    // Item(User):GET, return all menu items
    app.get("/api/item", function (req, res){
        db.Item.findAll({}).then(function(dbItem){
            res.json(dbItem);
        });
    });

    // Item(User):POST, return 1 menu item
    app.get("/api/item/:id", function (req, res){
        db.Item.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbItem){
            res.json(dbItem)
        });
    });

    // Orders(User):POST, post item to order
    app.post("/api/orders", function(req, res) {
        db.Item.create({
            seating_id: req.body.seating_id,
            item_id: req.body.item_id,
            item_quantity: req.body.item_quantity,
            complete: req.body.complete,
            submitted: req.body.submitted
        }).then(function(dbItem){
            res.json(dbItem)
        });
    });

    // Orders(User):PUT, update item in order
    app.put("/api/orders/:id", function(req, res) {
        db.Item.update({
            seating_id: req.body.seating_id,
            item_id: req.body.item_id,
            item_quantity: req.body.item_quantity,
            complete: req.body.complete,
            submitted: req.body.submitted
        }, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbItem){
                res.json(dbItem)
            });
    });

    // Orders(User):DELETE, delete item in order
    app.delete("/api/orders/:id", function(req, res) {
        db.Item.destroy({
            where: {
                id: req.params.id 
            }
        }).then(function(dbItem){
            res.json(dbItem)
        });
    });

    // Orders(Admin):GET, return all orders
    app.get("/admin/orders", function (req, res){
        db.Item.findAll({}).then(function(dbItem){
            res.json(dbItem);
        });
    });

    // Orders(Admin):PUT, update orders to "complete"
    app.put("/admin/orders/:id", function(req, res) {
        db.Item.update(req.body,
            {
                where: {
                    complete: req.params.complete
                }
            }).then(function(dbItem){
                res.json(dbItem)
            });
    });
};

