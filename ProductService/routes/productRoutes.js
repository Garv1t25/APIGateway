import {Router} from "express";
import {addProduct} from "../controllers/addProduct.js"
import {errorHandler} from "../utils/ErrorHandler.js"




const router = Router();

router.route('/addProduct').post(addProduct)



router.use(errorHandler)

export default router;