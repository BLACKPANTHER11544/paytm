import { Router } from "express";
import { auth } from "../middleware/authmiddleware.js";
import { GetBalance, TranferMoney } from "../controller/accountController.js";
const router = Router();
router.get("/CheckBalance", auth, GetBalance);
router.post("/TransferMoney", auth, TranferMoney);
export default router;
//# sourceMappingURL=accountRoutes.js.map