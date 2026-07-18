import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

productSchema.methods.isStockAvailable = function() {
    return this.stock > 0;
}


export const Product = mongoose.model("Product",productSchema);