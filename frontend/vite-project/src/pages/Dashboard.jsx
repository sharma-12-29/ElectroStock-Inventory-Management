import React, {useEffect,useState} from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import laptop2 from "../assets/laptop2.png"
import mouse from '../assets/mouse.png'
import buds from '../assets/buds.png'
import key from '../assets/key.jpg'
import pend from '../assets/pend.png'
import speaker from "../assets/speaker.jpg"
import webcam from "../assets/webcam.jpg"
import router from "../assets/router.jpg"
import printer from "../assets/printer.jpg"
import monitor from "../assets/monitor.jpg"
import SSD  from "../assets/SSD.png"
import tab from "../assets/tab.jpg"
import { Monitor, House, Box, FileText, Truck, TriangleAlert, ChevronDown } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./dashboard.css";
   
const productImages = {
  "laptop2.png": laptop2,
  "mouse.png": mouse,
  "buds.png": buds,
  "key.jpg": key,
  "pend.png": pend,
 "speaker.jpg": speaker,
  "webcam.jpg": webcam,
  "router.jpg": router,
  "printer.jpg": printer,
  "monitor.jpg": monitor,
  "SSD.png": SSD,
  "tab.jpg": tab,
};
const Dashboard = () => {
    const navigate = useNavigate();
  const[sidebarOpen , setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("6months");

const [dashboard, setDashboard] = useState({
  totalProducts: 0,
  totalCategories: 0,
  totalSuppliers: 0,
  lowStock: 0,
  recentProducts: [],
  topProducts: [],
  chartData: [],
});



  const getDashboard = async () => {
  try {

       const res = await api.get(`/dashboard?filter=${filter}`);
    setDashboard(res.data);

  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getDashboard();
}, [filter]);

  const chartData = dashboard.chartData;

  return (

    <div className="dashboard-container">

      <Sidebar
      sidebarOpen ={sidebarOpen}
      setSidebarOpen ={setSidebarOpen}
       />

      <div className="dashboard-content">
        <Navbar
          title={"Dashboard"}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />

        <div className="page-content">
          <h2>Welcome Back, Admin! 👋</h2>
          <p>Here's what is happening with your electronics inventary today. </p>

          <div className="cardss">

            <div className="card1">
              <Monitor size={35} />
              <h4>Total Products</h4>
              <p>{dashboard.totalProducts}</p>

              <p><span style={{ color: "#2563eb", fontSize: "18px" }}>+{dashboard.productGrowth}%</span> from the last month</p>
            </div>

            <div className="card2">
              <FileText size={35} />
              <h4>Categories</h4>
              <p>{dashboard.totalCategories}</p>

              <p>Updated Recently</p>
            </div>


            <div className="card3">
              <Truck size={35} />
              <h4>Suppliers</h4>
              <p>{dashboard.totalSuppliers}</p>

              <p><span style={{ color: "#16a34a", fontSize: "18px" }}>+{dashboard.newSuppliers}
</span> New Suppliers</p>
            </div>


            <div className="card4">
              <TriangleAlert size={35} />
              <h4>Low Stock Items</h4>
              <p>{dashboard.lowStock}</p>

              <p><span style={{ color: "#16a34a", fontSize: "18px" }}> {dashboard.lowStock} </span>From Last month</p>
            </div>

          </div>

          <div className="middle">
            <div className="graph-section">

              <div className="chart-header">
                <h4 className="head">Inventary Overview</h4>
                <p className="head">Stock and Low Stock Overview of last 6 month </p>

                <div className="chart-filter">
                  <span>Period</span>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Select chart period"
                  >
                    <option value="30days">Last 30 Days</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last 1 Year</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              </div>
               <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 12, right: 12, bottom: 12, left: 0 }}>
           <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis
      yAxisId="stock"
      allowDecimals={false}
      domain={[-1, (dataMax) => Math.max(1, dataMax + 1)]}
      tickFormatter={(value) => (value < 0 ? "" : value)}
    />
    <YAxis
      yAxisId="lowStock"
      orientation="right"
      allowDecimals={false}
      domain={[-1, (dataMax) => Math.max(1, dataMax + 1)]}
      hide
    />
    <Tooltip />
    <Legend />

    <Line
      type="linear"
      yAxisId="stock"
      dataKey="stock"
      stroke="#0f766e"
      strokeWidth={3}
      name="Stock"
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
    />

    <Line
      type="linear"
      yAxisId="lowStock"
      dataKey="lowStock"
      stroke="#ef4444"
      strokeWidth={3}
      name="Low Stock"
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
    />
  </LineChart>
</ResponsiveContainer>



            </div>
            <div className="product-sec">
              <h3>Highest Stock Products</h3>

              {dashboard.topProducts?.map((item,index) => (
                <div className="product-item" key={item.id}>
           <img
              src={productImages[item.image]}
              style={{ 
              width: "40px", 
              height: "40px", 
                marginRight: "12px" 
                  }}
              alt={item.name}
              />

                  <div className="product-info">
                    <h4>{item.name}</h4>
                    <p>{item.quantity} units in stock</p>
                  </div>

                  <span className="rank">{index+1}</span>

                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="recent-products">
          <div className="recent-header">
            <h3>Recent Products</h3>
            <button onClick={()=>navigate("/product")}
            >View All Products</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>

              </tr>
            </thead>
         
            <tbody>
  {dashboard.recentProducts?.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>{item.supplier}</td>
      <td>{item.quantity}</td>
      <td>₹{item.price}</td>

      <td
        className={
          item.quantity > 10 ? "td" : "tdd"
        }
      >
        {item.quantity > 10 ? "In Stock" : "Low Stock"}
      </td>
    </tr>
  ))}
  </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
