const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
      console.log(req.body);
   const {name,category,price,quantity,supplier,image}= req.body;
       const product = await Product.create({
      name,
      category,
      price,
      quantity,
      supplier,
      image
    });
    res.status(201).json({
        meaasage :"product created successfully",
        product
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const showproduct = async(req,res)=>{
    try{
        const products = await Product.find();

        res.status(200).json({
            message :"products fetched successfuly",
            products
        })
    }catch (error) {
    res.status(500).json({
      message: error.message,
    });
}
}
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProduct = async(req,res) =>{
  try{
    const {id} = req.params;
   
    const product = await Product.findByIdAndDelete(id);
    if(!product) {
      return res.status(404).json({
        message :"product not found"
      })
    }
    res.status(200).json({
      message:"product delete succesfully"
    })
  }catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  addProduct,
  showproduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
};