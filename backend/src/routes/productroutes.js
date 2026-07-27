const express = require("express");
const { addProduct,showproduct,getSingleProduct,updateProduct,deleteProduct} = require("../controllers/productController");
const loginMiddleware = require("../middleware/loginMiddleware");

const router = express.Router();

router.post("/add", loginMiddleware, addProduct);
router.get("/all",loginMiddleware,showproduct);
router.get("/:id",loginMiddleware,getSingleProduct);
router.put("/:id",loginMiddleware,updateProduct);
router.delete("/:id",loginMiddleware,deleteProduct)


module.exports = router;