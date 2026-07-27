const express = require("express");

const {
  addSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const loginMiddleware = require("../middleware/loginMiddleware");

const router = express.Router();

router.post("/add", loginMiddleware, addSupplier);
router.get("/all", loginMiddleware, getAllSuppliers);
router.get("/:id", loginMiddleware, getSingleSupplier);
router.put("/:id", loginMiddleware, updateSupplier);
router.delete("/:id", loginMiddleware, deleteSupplier);

module.exports = router;