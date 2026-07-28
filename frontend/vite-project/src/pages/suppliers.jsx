
import React, {useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import {
  Users,
  Truck,
  Clock,
  X,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

import "./dashboard.css";
import "./suppliers.css";




const Suppliers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
   const [editId, setEditId] = useState(null);
   const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");

const activeSuppliers = suppliers.filter((supplier) => supplier.status === "Active").length;
const pendingSuppliers = suppliers.filter((supplier) => supplier.status === "Pending").length;
const inactiveSuppliers = suppliers.filter((supplier) => supplier.status === "Inactive").length;
const totalLinkedProducts = suppliers.reduce(
  (total, supplier) => total + (supplier.products ?? 0),
  0,
);
const statusPercentage = (count) =>
  suppliers.length ? `${Math.round((count / suppliers.length) * 100)}%` : "0%";

const [formData, setFormData] = useState({
  companyName:"",
  contactPerson:"",
  email:"",
  phone:"",
  category:"",
  location:"",
  status:"Active"
});

  const getSuppliers = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
  "https://electrostock-inventory-management.onrender.com/api/suppliers/all",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setSuppliers(res.data.suppliers);

  } catch(error){
    console.log(error);
  }
};


useEffect(()=>{
  getSuppliers();
},[]);
const addSupplier = async()=>{

 try{

  const token = localStorage.getItem("token");

  if(editId){

    await axios.put(
  `https://electrostock-inventory-management.onrender.com/api/suppliers/${editId}`,

      formData,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

  }else{

    await axios.post(
  "https://electrostock-inventory-management.onrender.com/api/suppliers/all",
      formData,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

  }


  setShowModal(false);
  setEditId(null);

  setFormData({
    companyName:"",
    contactPerson:"",
    email:"",
    phone:"",
    category:"",
    location:"",
    status:"Active"
  });


  getSuppliers();


 }catch(error){
   console.log(error);
 }

};
const editSupplier = (supplier)=>{

 setEditId(supplier._id);

 setFormData({
  companyName:supplier.companyName,
  contactPerson:supplier.contactPerson,
  email:supplier.email,
  phone:supplier.phone,
  category:supplier.category,
  location:supplier.location,
  status:supplier.status
 });

 setShowModal(true);

};
const deleteSupplier = async(id)=>{

 const confirmDelete = window.confirm(
  "Delete this supplier?"
 );

 if(!confirmDelete) return;


 try{

 const token = localStorage.getItem("token");


 await axios.delete(
`https://electrostock-inventory-management.onrender.com/api/suppliers/${id}`,
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
 );


 getSuppliers();


 }catch(error){
  console.log(error);
 }

};
const filteredSuppliers = suppliers
.filter((supplier)=>{

 const searchMatch =
 supplier.companyName
 .toLowerCase()
 .includes(search.toLowerCase());

 const statusMatch =
 statusFilter === "" ||
 supplier.status === statusFilter;


 const categoryMatch =
 categoryFilter === "" ||
 supplier.category === categoryFilter;


 return searchMatch && statusMatch && categoryMatch;

});
  return (
    
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content">
        <Navbar title={"Suppliers"} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className="suppliers-content">
         <div className="supplier-header">
  <div>
    <h2>Suppliers</h2>
    <p>Manage and track all your suppliers</p>
  </div>

  <button
    className="btn"
    onClick={() => setShowModal(true)}
  >
    + Add Supplier
  </button>
</div>
          <div className="cardss">

            <div className="card1">
              <Users size={35} />
              <h4>Total Suppliers</h4>
              <p>{suppliers.length}</p>
              <p>
                <span>{totalLinkedProducts}</span> linked products
              </p>
            </div>

            <div className="card2">
  <Truck size={35} />
  <h4>Active Suppliers</h4>

  <p>
    {
      activeSuppliers
    }
  </p>

  <p>
    <span>{statusPercentage(activeSuppliers)}</span> of total suppliers
  </p>
</div>
                <div className="card3">
  <Clock size={35} />
  <h4>Pending Suppliers</h4>

  <p>
    {
      pendingSuppliers
    }
  </p>

  <p>
    <span>{statusPercentage(pendingSuppliers)}</span> of total suppliers
  </p>
</div>

          <div className="card4">
  <X size={35} />
  <h4>Inactive Suppliers</h4>

  <p>
    {
      inactiveSuppliers
    }
  </p>

  <p>
    <span>{statusPercentage(inactiveSuppliers)}</span> of total suppliers
  </p>
</div>

          </div>

          <div className="supplier-filters">

            <div className="supplier-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search Suppliers..."
                value= {search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>

          <select
className="supplier-select"
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
>
<option value="">All Status</option>
<option value="Active">Active</option>
<option value="Pending">Pending</option>
<option value="Inactive">Inactive</option>
</select>
<select
className="supplier-select"
value={categoryFilter}
onChange={(e)=>setCategoryFilter(e.target.value)}
>
<option value="">All Categories</option>
<option value="Electronics">Electronics</option>
<option value="Accessories">Accessories</option>
<option value="Mobiles">Mobiles</option>
<option value="Stationery">Stationery</option>
</select>
          </div>

          <div className="supplier-table-card">

            <div className="supplier-table-scroll">

              <table className="supplier-table">

                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Total Products</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier._id}>

                      <td>
                        <div className="supplier-name">

                          <span className="supplier-avatar">
                         {supplier.companyName.slice(0,2).toUpperCase()}
                          </span>

                          <div>
                            <strong>{supplier.companyName}</strong>
                            <small>{supplier.category}</small>
                          </div>

                        </div>
                      </td>

                      <td>{supplier.contactPerson}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.category}</td>
                      <td>{supplier.location}</td>

                      <td>
                        <span
                          className={`status-badge ${supplier.status.toLowerCase()}`}
                        >
                          {supplier.status}
                        </span>
                      </td>

                      <td className="products-count">
                        {supplier.products ?? 0}
                      </td>

                        <td>
  <div className="supplier-actions">

    <button 
      className="supplier-edit"
      onClick={()=>editSupplier(supplier)}
    >
      <Pencil size={17} />
    </button>


    <button
      className="supplier-delete"
      onClick={()=>deleteSupplier(supplier._id)}
    >
      <Trash2 size={17} />
    </button>

  </div>
</td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
      {showModal && (
<div className="modal-overlay">

<div className="modal">

{/* <h2>Add Supplier</h2> */}
<div className="modal-header">
<h2>{editId ? "Edit Supplier" : "Add Supplier"}</h2>

<button
    type="button"
    className="close-btn"
    onClick={()=>{
      setShowModal(false);
      setEditId(null);
    }}
  >
    ✕
  </button>
  </div>
<input
placeholder="Company Name"
value={formData.companyName}
onChange={(e)=>
setFormData({...formData,companyName:e.target.value})
}
/>


<input
placeholder="Contact Person"
value={formData.contactPerson}
onChange={(e)=>
setFormData({...formData,contactPerson:e.target.value})
}
/>


<input
placeholder="Email"
value={formData.email}
onChange={(e)=>
setFormData({...formData,email:e.target.value})
}
/>


<input
placeholder="Phone"
value={formData.phone}
onChange={(e)=>
setFormData({...formData,phone:e.target.value})
}
/>


<input
placeholder="Category"
value={formData.category}
onChange={(e)=>
setFormData({...formData,category:e.target.value})
}
/>


<input
placeholder="Location"
value={formData.location}
onChange={(e)=>
setFormData({...formData,location:e.target.value})
}
/>


<select
value={formData.status}
onChange={(e)=>
setFormData({...formData,status:e.target.value})
}
>
<option>Active</option>
<option>Pending</option>
<option>Inactive</option>
</select>

<div className="modal-btns">
<button className="save-btn"
 onClick={addSupplier}>
save
</button>

<button className="cancel-btn"
onClick={()=>setShowModal(false)}>
Cancel
</button>
</div>

</div>
</div>
)}
    </div>
  );
};

export default Suppliers;
