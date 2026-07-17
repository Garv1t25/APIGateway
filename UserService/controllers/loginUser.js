import User from '../models/user.model.js';
import { accessCookieOptions, refreshCookieOptions } from '../utils/cookieOptions.js';


const loginUser = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .cookie("accessToken", accessToken,accessCookieOptions)
        .json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { loginUser };