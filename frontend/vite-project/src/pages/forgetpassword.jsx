import React, {useState} from "react";
import { Mail, LockKeyhole, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./forgotpassword.css";


const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("");


  const handleReset = async(e)=>{
    e.preventDefault();

    try{

      const res = await api.put("/login/reset-password",{
        email,
        newPassword
      });


      alert(res.data.message);

      navigate("/login");


    }catch(error){

      console.log(error);
      alert(
        error.response?.data?.message || 
        "Something went wrong"
      );

    }
  };


  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <h2>Reset Password</h2>

        <p>
          Enter your email and create a new password
        </p>


        <form onSubmit={handleReset}>


        <div className="forgot-input">

          <Mail size={20}/>

          <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

        </div>



        <div className="forgot-input">

          <LockKeyhole size={20}/>

          <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          />

        </div>



        <button className="reset-btn">

          Reset Password
          <MoveRight size={20}/>

        </button>


        </form>


        <span 
        className="back-login"
        onClick={()=>navigate("/")}
        >
          Back to Login
        </span>


      </div>

    </div>

  )
}

export default ForgotPassword;