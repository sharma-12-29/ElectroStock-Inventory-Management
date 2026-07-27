import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Monitor ,House,Box,FileText,Truck, X } from 'lucide-react'

import './sidebar.css'

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
const role = user?.role;
  const closeSidebar = () => {
    if (typeof setSidebarOpen === 'function') {
      setSidebarOpen(false);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};

  return (
    <div>
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <button type="button" className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close sidebar">
          <X size={18} />
        </button>
        <div className="top-bar">
          <Monitor size={50} color="#14B8A6" strokeWidth={2.2} />
            <div className="feature-content2">
             <h2>ElectroStock</h2>
             <p>Electronic Inventory</p>
        </div>
        </div>

   <ul>
  <li>
    <NavLink to="/dashboard">
      <House size={20} />
      <span>Dashboard</span>
    </NavLink>
  </li>

  {
  role === "admin" && (
    <>
      <li>
        <NavLink to="/categories">
          <FileText size={20} />
          <span>Categories</span>
        </NavLink>
      </li>
    </>
  )
}


<li>
  <NavLink to="/product">
    <Box size={20} />
    <span>Product</span>
  </NavLink>
</li>


{
  role === "admin" && (
    <>
      <li>
        <NavLink to="/suppliers">
          <Truck size={20} />
          <span>Suppliers</span>
        </NavLink>
      </li>
    </>
  )
}
</ul>

<footer 
onClick={handleLogout}
      style={{ cursor: "pointer" }}>
    Logout
</footer>
        </div>

    </div>
  )
}

export default Sidebar
