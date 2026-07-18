import {Router} from "express";



const router = Router();

router.route('/addProduct').post( (req, res) => {
    return res.status(200).json({
        message: "Product added successfully"
    })
})

export default router;