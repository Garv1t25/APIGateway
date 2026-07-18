import User from "../models/user.model.js";

const getProfile = async (req, res) => {
    try {
        res.json({
            success: true,
            message: "Profile fetched successfully",
            user: { username: req.user.username, email: req.user.email }
        });

    } catch (err) {
        
        res.status(500).send({
            message: "Something went wrong while fetching profile"
        });
        
    }
}

export { getProfile }