const Product = require("../models/product");
const Category = require("../models/categories");
const Supplier = require("../models/supplier");

const getDashboardStats = async (req, res) => {
  try {
    const filter = req.query.filter || "6months";

let totalMonths = 6;

if (filter === "30days") {
  totalMonths = 1;
} else if (filter === "3months") {
  totalMonths = 3;
} else if (filter === "6months") {
  totalMonths = 6;
} else if (filter === "1year") {
  totalMonths = 12;
}
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();

    const lowStock = await Product.countDocuments({
      quantity: { $lte: 10 },
    });

    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const topProducts = await Product.find()
      .sort({ quantity: -1 })
      .limit(5);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
      const lastMonthProducts = await Product.countDocuments({
  createdAt: {
    $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  },
});

const currentMonthProducts = await Product.countDocuments({
  createdAt: {
    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  },
});

const productGrowth = lastMonthProducts === 0 
  ? 0 
  : Math.round(((currentMonthProducts - lastMonthProducts) / lastMonthProducts) * 100);


const lastMonthSuppliers = await Supplier.countDocuments({
  createdAt: {
    $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  },
});

const newSuppliers = totalSuppliers - lastMonthSuppliers;
    const currentDate = new Date();

    const chartData = [];

  for (let i = 0; i < totalMonths; i++) {
      // Include the current month and the five preceding months.
      const chartMonth = new Date(
        currentDate.getFullYear(),
      currentDate.getMonth() - (totalMonths - 1) + i
        
      );
      const start = chartMonth;
      const end = new Date(
        chartMonth.getFullYear(),
        chartMonth.getMonth() + 1,
        1,
      );

      const products = await Product.find({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      });

      const stock = products.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const lowStock = products.filter(
        (item) => item.quantity <= 10
      ).length;

      chartData.push({
        month: months[chartMonth.getMonth()],
        stock,
        lowStock,
      });
    }

    res.status(200).json({
      totalProducts,
      totalCategories,
      totalSuppliers,
      lowStock,
      recentProducts,
      topProducts,
      chartData,
       productGrowth,
  newSuppliers
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
