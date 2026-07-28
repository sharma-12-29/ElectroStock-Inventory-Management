import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { Plus, TrendingUp, Box, FileText, Search, Pencil, Trash2, Laptop, Smartphone, Headphones, HardDrive, Wifi, Keyboard, Monitor, Printer, Mouse } from 'lucide-react';
import './dashboard.css';
import './categories.css';



const Categories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [categories, setCategories] = useState([]);
const [showModal, setShowModal] = useState(false);
const [editId, setEditId] = useState(null);
const [search, setSearch] = useState("");
const [sort, setSort] = useState("");

const [formData, setFormData] = useState({
  name: "",
  description: "",
  status: "Active",
});
const getCategories = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
     "https://electrostock-inventory-management.onrender.com/api/categories/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCategories(res.data.category);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getCategories();
}, []);
const addCategory = async () => {
  try {
    const token = localStorage.getItem("token");

    if (editId) {
      await axios.put(
        `http://localhost:3000/api/categories/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:3000/api/categories/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setShowModal(false);

    setEditId(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    getCategories();

  } catch (error) {
    console.log(error);
  }
};
const editCategory = (item) => {
  setEditId(item._id);

  setFormData({
    name: item.name,
    description: item.description,
    status: item.status,
  });

  setShowModal(true);
};

const deleteCategory = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this category?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:3000/api/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getCategories();

  } catch (error) {
    console.log(error);
  }
};
const filteredCategories = categories
  .filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if(sort === "A-Z"){
      return a.name.localeCompare(b.name);
    }

    if(sort === "Z-A"){
      return b.name.localeCompare(a.name);
    }

    return 0;
  });
  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="dashboard-content">
        <Navbar title={"Categories"} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="page-content">
          <div className="product-list">
            <div className="product-head">
              <h2>Categories</h2>
              <p>Organize and manage all categories in your inventory</p>
            </div>
             <button
  className="btn"
  onClick={() => {
    setEditId(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  }}
>
  <Plus size={20} className="btn-icon" />
  <span className="btn-label">Add Category</span>
</button>
          </div>

          <div className="cardss">
            <div className="card1">
              <FileText size={35} />
              <h4>Total Categories</h4>
              <p>{categories.length}</p>
              <p>All product categories</p>
            </div>

            <div className="card2">
              <Box size={35} />
              <h4>Total Products</h4>
              <p>{categories.reduce((total, category) => total + category.products, 0)}</p>
              <p>Across all categories</p>
            </div>

            <div className="card3">
              <TrendingUp size={35} />
              <h4>Active Categories</h4>
              <p>{categories.filter((category) => category.status === 'Active').length}</p>
              <p>Currently active</p>
            </div>

            <div className="card4">
              <Box size={35} />
              <h4>Inactive Categories</h4>
              <p>{categories.filter((category) => category.status === 'Inactive').length}</p>
              <p>Needs attention</p>
            </div>
          </div>

          <div className="categories-panel">
            <div className="nav-act">
              <div className="search">
                <Search size={15} />
               <input
                type="text"
                          placeholder="Search category or status..."
                      value={search}
                     onChange={(e)=>setSearch(e.target.value)}
                     />
              </div>
                <select
 className="dropdown2"
 value={sort}
 onChange={(e)=>setSort(e.target.value)}
>
<option value="">Sort By</option>
<option value="A-Z">Sort by A-Z</option>
<option value="Z-A">Sort by Z-A</option>
</select>
            </div>

            <div className="category-table">
              <div className="category-row category-row--head">
                <div className="category-info">Category</div>
                <div className="category-metric">Products</div>
                <div className="category-metric">Status</div>
                <div className="category-metric">Growth</div>
                <div className="category-metric">Actions</div>
              </div>

              {filteredCategories.map((item, index) => (
                <div className="category-row" key={item.name}>
                 <div className="category-info">
  <div className="category-badge category-badge--teal" aria-hidden="true">
    <FileText size={22} strokeWidth={2} />
  </div>

  <div>
    <h4>{item.name}</h4>
    <p>{item.description}</p>
  </div>
</div>
                  <div className="category-metric">
                    <strong>{item.products}</strong>

                    {/* <span>items</span> */}
                  </div>
                  <div className="category-status">
                    <span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span>
                  </div>
                  <div className="category-growth">+{Math.max(3, 15 - index)}%</div>
                  <div className="category-actions">
                    <button type="button"
                    onClick={() => editCategory(item)}
                     className="action-btn action-btn--edit" aria-label={`Edit ${item.name}`} title={`Edit ${item.name}`}>
                      <Pencil size={16} />
                    </button>
                    <button type="button"
                    onClick={() => deleteCategory(item._id)}
          
                     className="action-btn action-btn--delete" aria-label={`Delete ${item.name}`} title={`Delete ${item.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
  {/* <h2>Add Category</h2> */}
<h2>{editId ? "Edit Category" : "Add Category"}</h2>
  <button
    type="button"
    className="close-btn"
   onClick={() => {
  setShowModal(false);
  setEditId(null);
}}
  >
    ✕
  </button>
</div>

      <input
        type="text"
        placeholder="Category Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status: e.target.value,
          })
        }
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div className="modal-btns">
        <button
          className="cancel-btn"
        onClick={() => {
  setShowModal(false);
  setEditId(null);
}}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={addCategory}
        >
          {editId ? "Update" : "Save"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Categories;
