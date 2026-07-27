const express = require("express");
const { registerUser,loginUser,resetPassword} = require("../controllers/logincontroller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.put("/reset-password", resetPassword);

module.exports = router;