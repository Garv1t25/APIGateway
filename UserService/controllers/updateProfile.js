import User from "../models/user.model.js"

const updateProfile = async (req, res)=>{

    try{
        const {username, email} = req.body;
        
        if(!username && !email){
            return res.status(400).json({
                message: "Please provide at least one field"
            });
        }
        if(!req.user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        

        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });

            if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
            req.user.email = email;
        }

        if(username){
            req.user.username = username;
        }
        
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: {username:req.user.username, email:req.user.email} },
            { returnDocument:true , runValidators: true}
        ).select("username email");
        
        return res.status(200).json({
            message: "User updated successfully",
            data: {
                username:req.user.username,
                email:req.user.email
            }
        });
    
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export {updateProfile}