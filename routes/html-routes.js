var path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
      });
    
    app.get("/admin", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin.html"))
    });

    /////////////////////////// Passport User/Non-User HTML Redirect

    // Redirects user to admin page if they are logged in
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/admin");
        }
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    });

    // Non-Admin trying to access admin.html are redirected to main.html
    app.get("/admin", isAuthenticated, function (req, res) {
        res.SendFile(path.join(__dirname, "../public/main.html"));
    });



}