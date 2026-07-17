import User from "../models/user.model.js"


const changePass = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if(oldPassword === newPassword){
            return res.status(400).json({
                message: "Old password and new password cannot be the same"
            });
        }



        const check = await user.comparePassword(oldPassword);
        if (!check) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New passwords do not match"
            });
        }

        if(newPassword.length < 8 && confirmPassword.length<8){
            return res.status(400).json({
                message: "New password must be at least 8 characters long"
            });
        }

        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            message: "Password changed successfully"
        });


    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Something went wrong while changing password"
        });
    }
}

export { changePass }
