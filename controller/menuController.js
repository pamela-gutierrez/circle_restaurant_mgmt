var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function (req, res) {
	db.Items.findAll({}).then(function (data) {
		var hbsObject = {
			items: data
		};
		res.render("index", hbsObject);
	});
});

module.exports = router;