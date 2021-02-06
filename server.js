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

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Thank you for connecting to Circle Contactless Ordering and Menu Management")
    });
  });
  