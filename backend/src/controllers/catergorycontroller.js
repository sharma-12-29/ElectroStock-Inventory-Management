const Category = require("../models/categories");
const Product = require("../models/product");
const addCategory = async(req,res)=>{
    try{
      console.log(req.body)
     const { name, description, status } = req.body;
     const category = await Category.create({
        name,description,status
     })
     res.status(201).json({
        message:"catergory created succesfully"
     })
     
}catch (error) {
    console.log(error);


    res.status(500).json({
      meassgae:error.message
    
    });
  }
}
 
// const getAllCategory = async(req,res)=>{
//         try{
//         const category = await Category.find();

//         res.status(200).json({
//             message :"catergory  fetched successfuly",
//             category
//         })
//     }catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
// }
// }
const getAllCategory = async(req,res)=>{
    try{
        const categories = await Category.find();

        const categoryWithProducts = await Promise.all(
            categories.map(async (cat)=>{
              const productCount = await Product.countDocuments({
    category: cat.name
});

                return {
                    ...cat.toObject(),
                    products: productCount
                };
            })
        );

        res.status(200).json({
            message :"category fetched successfully",
            category: categoryWithProducts
        });

    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

const getOneCategory = async(req,res)=>{
      try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    res.status(200).json({
      message: "category fetched successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const updateCategory = async(req,res)=>{
        try {
    const { id } = req.params;

    const catergory = await Category.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!catergory) {
      return res.status(404).json({
        message: "catergory not found",
      });
    }

    res.status(200).json({
      message: "catergory updated successfully",
      catergory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  } 
}
const deleteCategory = async(req,res)=>{
      try{
    const {id} = req.params;
   
    const category= await Category.findByIdAndDelete(id);
    if(!category) {
      return res.status(404).json({
        message :"category not found"
      })
    }
    res.status(200).json({
      message:"catergory delete succesfully"
    })
  }catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
module.exports = {addCategory,getAllCategory,getOneCategory,updateCategory,deleteCategory}