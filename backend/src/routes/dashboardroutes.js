const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardcontroller");
const loginMiddleware = require("../middleware/loginmiddleware");

router.get("/", loginMiddleware, getDashboardStats);

module.exports = router;