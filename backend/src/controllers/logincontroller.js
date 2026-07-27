const { default: mongoose } = require("mongoose");
const User = require("../models/login");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
      const{email,password,role} = req.body;
    // check if user already exist
    const isuserexist = await User.findOne({email})
    if(isuserexist){
      return res.status(200).json({
        message:"user already exist"
      })
    }
    const hashedpassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password:hashedpassword,
        role
      })
      res.status(200).json({
        message: "user created successfully",
        user
      })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        message: "Invalid role",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({id: user._id, role: user.role,},process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // res.cookie(token)

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const resetPassword = async(req,res)=>{
  try{

    const {email,newPassword}=req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message:"Password reset successfully"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

module.exports = { registerUser,loginUser,resetPassword };
