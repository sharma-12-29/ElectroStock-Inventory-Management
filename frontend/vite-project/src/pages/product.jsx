import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { Plus, Search,Pencil,Trash2 } from 'lucide-react';
import laptop2 from "../assets/laptop2.png";
import mouse from "../assets/mouse.png";
import buds from "../assets/buds.png";
import key from "../assets/key.jpg";
import pend from "../assets/pend.png";
import monitor from "../assets/monitor.jpg";
import printer from "../assets/printer.jpg";
import speaker from "../assets/speaker.jpg";
import router from "../assets/router.jpg";
import webcam from "../assets/webcam.jpg";
import SSD from "../assets/SSD.png";
import tab from "../assets/tab.jpg";
import api from "../api/axios"
import './product.css'


const Product = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);
const [products, setProducts] = useState([]);
const [showForm, setShowForm] = useState(false);
const [editId, setEditId] = useState(null);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All Categories");
const [brand, setBrand] = useState("All Brands");
const [stock, setStock] = useState("All Stock");

const [product, setProduct] = useState({
  name: "",
  category: "",
  price: "",
  quantity: "",
  supplier: "",
  image: "",
});
const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role;

const handleChange = (e) => {
  setProduct({
    ...product,
    [e.target.name]: e.target.value,
  });
};
const addProduct = async () => {
  try {

 await api.post("/products/add", product);

    alert("Product Added Successfully");

    setShowForm(false);

    window.location.reload();

  } catch(error){
    console.log(error);
  }
};
const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);

    alert("Product Deleted Successfully");

    getProducts();

  } catch (error) {
    console.log(error);
  }
};

const editProduct = (item) => {
  setProduct({
    name: item.name,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    supplier: item.supplier,
    image: item.image,
  });

  setEditId(item._id);
  setShowForm(true);
};
const updateProduct = async () => {
  try {

    await api.put(
      `/products/${editId}`,
      product
    );

    alert("Product Updated Successfully");

    setShowForm(false);
    setEditId(null);

    getProducts();

  } catch(error){
    console.log(error);
  }
};
const openAddForm = () => {
  setProduct({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
    image: "",
  });

  setEditId(null);
  setShowForm(true);
};
const productImages = {
  "laptop2.png": laptop2,
  "mouse.png": mouse,
  "buds.png": buds,
  "key.jpg": key,
  "pend.png": pend,
  "monitor.jpg": monitor,
  "printer.jpg": printer,
  "speaker.jpg": speaker,
  "router.jpg": router,
  "webcam.jpg": webcam,
  "SSD.png": SSD,
  "tab.jpg": tab,
};
const getProducts = async () => {
  try {
    const res = await api.get("/products/all");
    console.log("api calll",res.data);
    setProducts(res.data.products);
  } catch (error) {
    console.log(error);
  }
}; 
useEffect(() => {
  getProducts();
}, []);
console.log(products);
const filteredProducts = products.filter((item) => {

  const searchMatch = item.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const categoryMatch =
    category === "All Categories" ||
    item.category === category;

  const brandMatch =
    brand === "All Brands" ||
    item.supplier === brand;

  const stockMatch =
    stock === "All Stock" ||
    (stock === "In Stock" && item.quantity > 10) ||
    (stock === "Low Stock" && item.quantity > 0 && item.quantity <= 10) ||
    (stock === "Out of Stock" && item.quantity === 0);

  return searchMatch && categoryMatch && brandMatch && stockMatch;
});
  return (
    <div>
      <div className="dashboard-container">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="dashboard-content">
          <Navbar title={"Products"} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className="product-list">
            <div className="product-head">
              <h2>Products</h2>
              <p>Manage all electronic products in your inventory</p>
            </div>
          {
     role === "admin" && (
    <button onClick={openAddForm} className='btn'>
      <Plus size={20} className="btn-icon" />
      <span className="btn-label">Add Product</span>
    </button>
  )
}
          </div>
          {showForm && (
  <div className="modal-overlay">
    <div className="modal">

      <div className="modal-header">
        <h2>Add New Product</h2>
        <button
          className="close-btn"
          onClick={() => setShowForm(false)}
        >
          ✕
        </button>
      </div>

      <div className="form-grid">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />

        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={product.supplier}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Paste Image URL"
          value={product.image}
          onChange={handleChange}
        />

      </div>

      <div className="modal-btns">
        {/* <div className="modal-header"> */}
        <button
          className="cancel-btn"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button> 

      <button className="save-btn"
     onClick={editId ? updateProduct : addProduct}
       >
    {editId ? "Update Product" : "Save Product"}
      </button>
      </div>
      </div>

    {/* </div> */}
  </div>
)}
          <div className="card-section">

            <div className="nav-act">
              <div className="search">
                <Search size={15} />
                <input type="text" placeholder="Search Product by name, brand.."
                value ={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
              </div>
              <div className="filters">

                <select className="dropdown"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Laptop</option>
                  <option>Mouse</option>
                  <option>Keyboard</option>
                  <option>Monitor</option>
                  <option>Storage</option>
                  <option>Printer</option>
                  <option>Audio</option>
                </select>

                <select className="dropdown"
                 value={brand}
               onChange={(e)=>setBrand(e.target.value)}
                >
                  <option>All Brands</option>
                  <option>Dell</option>
                  <option>HP</option>
                  <option>Lenovo</option>
                  <option>Logitech</option>
                  <option>Samsung</option>
                  <option>LG</option>
                  <option>Canon</option>
                  <option>boAt</option>
                </select>

                <select className="dropdown"
            value={stock}
               onChange={(e)=>setStock(e.target.value)}
                >
                
                  <option>All Stock</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>

              </div>
            </div>
            
       <div className="product-grid">
  {filteredProducts.map((item) => {
    return (
      <div className="grids" key={item._id}>
<img
  className="images"
  
    src={
    item.image?.startsWith("http")
      ? item.image
      : productImages[item.image]
  }
  alt={item.name}
/>
  <h4>{item.name}</h4>
<p className="brand">Supplier: {item.supplier}</p>
<p className="price">Price: ₹{item.price}</p>
<p className="stock">Quantity: {item.quantity}</p>
            {
 role === "admin" && (
  <div className="card-actions">

    <button 
      className="edit-btn"
      onClick={()=> editProduct(item)}
    >
      <Pencil size={15} />
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={()=>deleteProduct(item._id)}
    >
      <Trash2 size={15} />
      Delete
    </button>

  </div>
 )
}
      </div>
    );
  })}
</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
