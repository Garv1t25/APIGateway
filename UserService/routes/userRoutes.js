import { Router } from "express";
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import verifyJWT from "../middleware/verifyjwt.js";
import { logoutUser } from "../controllers/logoutUser.js";
import { getProfile } from "../controllers/getProfile.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.use(verifyJWT)

router.route("/profile").get(getProfile);
router.route("/logout").post(logoutUser);

export default router;