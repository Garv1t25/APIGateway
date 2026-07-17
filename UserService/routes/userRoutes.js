import { Router } from "express";
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import verifyJWT from "../middleware/verifyjwt.js";
import { logoutUser } from "../controllers/logoutUser.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.use(verifyJWT)

router.route("/logout").post(logoutUser);

export default router;