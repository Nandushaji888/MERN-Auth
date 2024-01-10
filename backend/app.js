import express from "express";
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRouter.js'
import dotenv from 'dotenv'
dotenv.config()
import { mongoDbConnection } from "./config/mongoDbConnection.js";
const app=express();
import Cors from 'cors'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(Cors())

const PORT= process.env.PORT || 4500
mongoDbConnection();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',userRouter)
app.use('/api/admin',adminRouter)


app.listen(PORT,()=>console.log(`App listen at http://localhost:${PORT}`))