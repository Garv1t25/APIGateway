import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import ProductRoutes from './routes/productRoutes.js'


const app = express();

app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb", extended:true}));
app.use(cookieParser());

app.use('/api/products',ProductRoutes);

export default app;
