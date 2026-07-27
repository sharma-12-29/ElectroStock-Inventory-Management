const express = require("express");
const {addCategory,getAllCategory,getOneCategory,updateCategory,deleteCategory} =require("../controllers/catergorycontroller")
const loginMiddleware = require("../middleware/loginmiddleware");

const router = express.Router();

router.post("/add", loginMiddleware, addCategory);
router.get("/all",loginMiddleware,getAllCategory);
router.get("/:id",loginMiddleware,getOneCategory);
router.put("/:id",loginMiddleware,updateCategory);
router.delete("/:id",loginMiddleware,deleteCategory)


module.exports = router;