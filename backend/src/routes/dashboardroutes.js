const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");
const loginMiddleware = require("../middleware/loginMiddleware");

router.get("/", loginMiddleware, getDashboardStats);

module.exports = router;