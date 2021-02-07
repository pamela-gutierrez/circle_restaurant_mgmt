var path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
      });
    
    
    app.get("/admin", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin.html"))
    })

}