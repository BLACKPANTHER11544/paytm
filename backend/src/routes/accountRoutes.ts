import {Router} from  "express" 
import { auth } from "../middleware/authmiddleware.js";
import {GetBalance} from "../controller/accountController.js"
const router = Router() ;

router.get("/CheckBalance", auth, GetBalance)


export default  router ;