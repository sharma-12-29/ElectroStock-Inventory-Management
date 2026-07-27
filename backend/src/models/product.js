const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    supplier: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    sold: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("product", productSchema);