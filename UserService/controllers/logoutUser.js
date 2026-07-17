
import User from "../models/user.model.js";
import {accessCookieOptions, refreshCookieOptions} from "../utils/cookieOptions.js";

const logoutUser = async (req, res) => {
    const id = req.user._id;
    await User.findByIdAndUpdate(id,{refreshToken: null});
    res.cookie("accessToken", null);
    res.cookie("refreshToken", null);

    res.send({
        message : "request recieved",
        cookies: req.cookies
    })
}

export {logoutUser}