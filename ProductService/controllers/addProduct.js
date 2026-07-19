import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const addProduct =  asyncHandler(async (req,res)=>{
    

    const {name,price,stock} = req.body;
    if(!name || !price || !stock){
        throw new ApiError(400,"All fields are required");
    }
    

    const product = await Product.create({name,price,stock});

    res.status(201).json(new ApiResponse(201,product,"Product added successfully"));
})

export {addProduct};