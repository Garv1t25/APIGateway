import User from "../models/user.model.js";

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken -__v -_id -createdAt -updatedAt").lean();

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        

        res.send({
            message: "Profile fetched successfully",
            user: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Something went wrong while fetching profile"
        });
    }
}

export { getProfile }