const Supplier = require("../models/supplier");
const Product = require("../models/product");

// add suplier

const addSupplier = async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      category,
      location,
      status,
    } = req.body;

    const supplier = await Supplier.create({
      companyName, 
      contactPerson,
      email,
      phone,
      category,
      location,
      status,
    });

    res.status(201).json({
      message: "Supplier created successfully",
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// get all supplier
const getAllSuppliers = async (req, res) => {
  try {
    const [suppliers, productCounts] = await Promise.all([
      Supplier.find(),
      Product.aggregate([
        {
          $group: {
            _id: "$supplier",
            products: { $sum: 1 },
          },
        },
      ]),
    ]);

    const normalizeSupplierName = (value) =>
      String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

    const suppliersWithProducts = suppliers.map((supplier) => ({
      ...supplier.toObject(),
      products: productCounts.reduce((total, item) => {
        const savedProductSupplier = normalizeSupplierName(item._id);
        const companyName = normalizeSupplierName(supplier.companyName);

        // Existing products store short names such as "HP" and "Dell",
        // while supplier records use full company names.
        const isSameSupplier =
          savedProductSupplier === companyName ||
          companyName.includes(savedProductSupplier) ||
          savedProductSupplier.includes(companyName);

        return isSameSupplier ? total + item.products : total;
      }, 0),
    }));

    res.status(200).json({
      message: "Suppliers fetched successfully",
      suppliers: suppliersWithProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one
const getSingleSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({
        message: "supplier not found",
      });
    }
    res.status(200).json({
      message: "supplier fetched successfully",
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// update
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// detele
const deleteSupplier = async(req,res)=>{
    try{
        const { id} = req.params;
        const supplier = await Supplier.findByIdAndDelete(id);
      if(!supplier){
        return res.status(404).json({
            message:"supplier not found"
        })
      }
      res.status(200).json({
        message :" supplier delete succesfully"
      })
    } catch(error){
         res.status(500).json({
      message: error.message,
    });
    }
}

module.exports = {addSupplier, getAllSuppliers, getSingleSupplier, updateSupplier, deleteSupplier}
