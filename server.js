var express = require("express");
var session = require("express-session");

var passport = require("./config/passport.js");

var PORT = process.env.PORT || 8080;

var db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "circle_management", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

var routes = require("./controller/menuController.js");
app.use(routes);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Thank you for connecting to Circle Contactless Ordering and Menu Management")
    });
});
