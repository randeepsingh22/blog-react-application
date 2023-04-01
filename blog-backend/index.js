import express, { Router } from "express";
import ConnectToDatabase from "./database/dbconnection.js";
import {router} from "./routes/routes.js";
import cors from "cors"
import bodyParser from "body-parser"

const app = express();
const PORT = 5000;




// For parsing data in api
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());



app.use("/",router)

// app.get("/",(req,res)=>{
// res.send("Hello world")
// })

app.listen(PORT, (e) => {
  console.log("Server Started Successfully.");
});
ConnectToDatabase("kcetconsole","mMXNKyaUO6Y4iXcu");
