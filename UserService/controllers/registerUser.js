import User from "../models/user.model.js";

const registerUser = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { registerUser };