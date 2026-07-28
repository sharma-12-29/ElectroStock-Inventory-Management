import React ,{useState} from 'react'
import laptop from '../assets/laptop.png'
import { Box, ChartColumn, ShieldAlert, ShieldCheck, CircleUser, Users, Mail, LockKeyhole, MoveRight } from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import api from "../api/axios";

import './login.css'

const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/login/login", {
      email,
      password,
      role,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");

  } catch(error){
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);
    alert(error.response?.data?.message || "Login failed");
  }
};
  return (
    <div>
      <main className="main">
        <div className="cards">
          <div className="left">
            <div className="ec-icon">
              <div className="logo">
                <Box size={30} style={{marginLeft: '20px'}} color="#14b8a6" strokeWidth={2} />
                <h6>ElectroStock</h6>
              </div>
              <h1>  Welcome <span className="back">Back!</span></h1>
              <p className="para">
                Sign in to continue to your <br /> electronic inventory system.
              </p>
              <img className="laptop" src={laptop} alt="Laptop" />
            </div>

            <div className="feature-box">
              <Box size={35} className="feature-icon" />

              <div className="feature-content">
                <h4>Smart Inventory Management</h4>
                <p>Track and manage all your electronic products <br/> in one place.</p>
              </div>
            </div>

            <div className="feature-box">
              <ChartColumn size={35} className="feature-icon" />

              <div className="feature-content">
                <h4>Real-time Analytics</h4>
                <p>Get insights into your inventory performance<br/> and trends.</p>
              </div>
            </div>

            <div className="feature-box">
              <ShieldAlert size={35} className="feature-icon" />

              <div className="feature-content">
                <h4>Secure & Reliable</h4>
                <p>Protect your inventory data with <br/> enterprise-grade security.</p>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="heading">
          <h3>Sign in to your account</h3>
          <p >Select your role and enter your credentials to continue</p>

          <h4>Select role</h4>
          </div>
              <div className="cards2">
       <div
  className={`role-card ${role === "admin" ? "active" : ""}`}
  onClick={() => setRole("admin")}
>

            <CircleUser size={35} className="feature-icon2" />
            <h3>Admin</h3>
            <p>Full Access to all features</p>

          </div>

           <div
  className={`role-card ${role === "staff" ? "active" : ""}`}
  onClick={() => setRole("staff")}
>

            <Users size={35} className="feature-icon2" />
            <h3>Staff</h3>
            <p>Manage inventory and transactions</p> 

          </div>

          </div>
             
<form onSubmit={handleLogin}>

  <div className="form-group">
    
    <label htmlFor="email">Email</label>
    <Mail size={20} className="form-icon" />
   <input
  type="email"
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>
  </div>

  <div className="form-group">
    <label htmlFor="password">Password</label>
    <LockKeyhole size={20} className="form-icon" />
      <input
  type="password"
  id="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
/>
  </div>

  <div className="forgot-password">
   <a onClick={()=>navigate("/forgot-password")}>
       Forgot Password?
</a>
  </div>

  <button type="submit" className="login-button">
    {loading ? "Signing in..." : "Sign In"}
    <MoveRight size={20} style={{marginLeft: '10px'}} />
  </button>

</form>
<div className="login-security" role="note">
  <span className="login-security-icon"><ShieldCheck size={20} /></span>
  <div>
    <strong>Secure account access</strong>
    <p>Your inventory data is protected with secure sign-in.</p>
  </div>
</div>

          </div>
  

        </div>
        
      </main>

    </div>
  )
}

export default Login
