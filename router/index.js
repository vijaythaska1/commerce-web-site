import express from "express";
import UserControlller from "../controller/UserControlller.js";
import AuthController from "../controller/AuthController.js";
import helper from "../utility/helper.js";



const router = express.Router();

router.post("/UserCreate", helper.asyncMiddleware, helper.authenticateToken, UserControlller.UserCreate);

//<---------------------auth------------------------>
router.post("/login",helper.asyncMiddleware, AuthController.login);
router.post("/changepassword",helper.asyncMiddleware, helper.authenticateToken, AuthController.changepassword);

export default router;
