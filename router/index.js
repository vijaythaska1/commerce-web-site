import express from "express";
import UserControlller from "../controller/UserControlller.js";
import AuthController from "../controller/AuthController.js";

const router = express.Router();

router.post("/UserCreate", UserControlller.UserCreate);

//<---------------------auth------------------------>
router.post("/login",AuthController.login);
router.post("/changepassword", AuthController.changepassword)

export default router;
