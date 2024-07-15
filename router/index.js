import express from "express";
import UserControlller from "../controller/UserControlller.js";
import AuthController from "../controller/AuthController.js";
import helper from "../utility/helper.js";

const router = express.Router();

router.post("/fileuploe", helper.uploadFile);


router.post("/UserCreate", helper.asyncMiddleware, UserControlller.UserCreate);
//<---------------------auth------------------------------------------------------------>
//<---------------------key valediction -------------------------------------------------->
router.use(helper.asyncMiddleware);
router.post("/login", AuthController.login);

//<---------------------------token valediction ------------------------------------------->
router.use( helper.authenticateToken);
router.get("/UserProfile", AuthController.UserProfile);
router.post("/changePassword", AuthController.ChangePassword);

export default router;
