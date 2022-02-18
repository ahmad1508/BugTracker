const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//router.get("/get", userController.get_users);
router.get("/create", userController.create_user);


module.exports = router;
