import { Router } from "express";
import { userSignUp, UserSignIN, UserUpdate, DeleteUser, GetUserDetail } from "../controller/userController.js";
import { auth } from "../middleware/authmiddleware.js";
const router = Router();
router.post("/signUp", userSignUp);
router.post("/signIn", UserSignIN);
router.get("/profile", auth, GetUserDetail);
router.put("/updateUser", auth, UserUpdate);
router.delete("/deleteUser", auth, DeleteUser);
export default router;
//# sourceMappingURL=userRoutes.js.map