import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import {accessCookieOptions, refreshCookieOptions} from "../utils/cookieOptions.js";


const verifyJWT = async (req, res, next) => {
    console.log("typeof next:", typeof next);
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({
            message: "Please login first"
        });
    }
    
    if (accessToken) {
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET
            );

            req.user = decoded;
            return next();
        
        } catch (error) {

            
            if (error.name !== "TokenExpiredError") {
                console.error(error);

                return res.status(401).json({
                    message: "Please login again."
                });
            }

            
        }
    }


    if (!refreshToken) {
        return res.status(401).json({
            message: "Please login again"
        });
    }

    try {
        const decodedRefresh = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedRefresh._id);

        if (!user) {
            return res.status(401).json({
                message: "User not found, please enter valid credentials"
            });
        }

        
        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid refresh token, please login again"
                
            });
        }

        
        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();
        user.refreshToken = newRefreshToken;
        await user.save({validateBeforeSave: false});

        res.cookie("accessToken", newAccessToken, accessCookieOptions);

        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

        // console.log("new token generated")

        
        req.user = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        return next()

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            message: "Please login again."
        });
    }
};

export default verifyJWT;