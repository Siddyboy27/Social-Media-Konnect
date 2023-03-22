import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose"; 
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; //Properly set paths to configure directories


import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js"
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());;
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true})); // incoming data is parsed. Maximum limit is 30mb. Extended implies we can use nested objects such as nested arrays and nested objects.
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets'))); // stores the assets such as images.



const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
}); // handle file uploads.
const upload=multer({storage})


//Routes with Files
app.post("/auth/register",upload.single("picture"),register); 
app.post("/posts",verifyToken,upload.single("picture"),createPost);
//Routes for others

app.use("/auth",authRoutes);
app.use("/users",userRoutes)
app.use("/posts",postRoutes)
/*DATABASE*/

const PORT=process.env.PORT || 6000;
mongoose.connect(process.env.MONGO)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is runing on port number ${PORT}`);
        })
        // User.insertMany(users);
        // Post.insertMany(posts);
        //Don't uncomment them. That was a dummy File alone.
    })
    .catch((error)=>{
        console.log(error);
    })