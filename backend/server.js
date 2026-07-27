  const app =  require("./src/app")
   const dotenv =  require("dotenv")
   const express= require("express")
   const cors = require("cors")
 const connectToDb = require("./src/config/db")
 const loginRoutes = require("./src/routes/loginroutes");
  const productRoutes = require("./src/routes/productroutes")
  const categoryRoutes = require("./src/routes/categoriesroutes");
  const supplierRoutes = require("./src/routes/suppliesroutes");
  const dashboardRoutes = require("./src/routes/dashboardroutes");

  
 app.use(cors());
 app.use(express.json())
 
   dotenv.config();
   connectToDb();
  //  import all routes here
     app.use("/api/login", loginRoutes);
     app.use("/api/products" , productRoutes)
      app.use("/api/categories", categoryRoutes);
      app.use("/api/suppliers", supplierRoutes);
      app.use("/api/dashboard", dashboardRoutes);
    // sample code
      app.get("/",(req,res)=>{
      res.send("server is running")
})

  app.listen(3000,()=>{
    console.log("server is runnning on port 3000")
  })