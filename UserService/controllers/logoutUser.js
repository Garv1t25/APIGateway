
import User from "../models/user.model.js";
import {accessCookieOptions, refreshCookieOptions} from "../utils/cookieOptions.js";

const logoutUser = async (req, res) => {
    try{
        const id = req.user._id;
        await User.findByIdAndUpdate(id,{refreshToken: null});
        res.clearCookie("accessToken", accessCookieOptions);
        res.clearCookie("refreshToken", refreshCookieOptions);

        res.send({
            message : "User Logged Out"
        })
    }catch(err){
        console.log(err);
        res.send({
            message : "Something went wrong while logging out"
            
        })
    }

    
}

export {logoutUser}