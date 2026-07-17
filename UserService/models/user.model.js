import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase : true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase : true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],  
            minlength: 8
        },
        refreshToken: {
            type: String,
            default: null
        },
    },
    { 
        timestamps: true
    }
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next;
    }
    
    this.password = await bcrypt.hash(this.password, 10);
    next;
});

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;