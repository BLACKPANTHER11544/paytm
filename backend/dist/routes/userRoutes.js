import { Router } from "express";
import { userSignUp, UserSignIN } from "../controller/userController.js";
const router = Router();
router.post("/signUp", userSignUp);
router.post("/signIn", UserSignIN);
export default router;
//# sourceMappingURL=userRoutes.js.map