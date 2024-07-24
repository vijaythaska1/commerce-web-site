import express from "express";
import UserControlller from "../controller/UserControlller.js";
import AuthController from "../controller/AuthController.js";
import helper from "../utility/helper.js";
import CmsController from "../controller/CmsController.js";

const router = express.Router();

router.post("/fileuploe", helper.uploadFile);


router.post("/UserCreate", helper.asyncMiddleware, UserControlller.UserCreate);
//<---------------------auth------------------------------------------------------------>
//<---------------------key valediction -------------------------------------------------->
router.use(helper.asyncMiddleware);
router.post("/login", AuthController.login);

//<---------------------------token valediction ------------------------------------------->
router.use(helper.authenticateToken);
router.post("/logout", AuthController.logout);
router.get("/UserProfile", AuthController.UserProfile);
router.post("/changePassword", AuthController.ChangePassword);

//<------------------------------Cms------------------------------------------------------>
router.post("/cmscreate", CmsController.cmsCreate)
router.get("/cmsget", CmsController.CmsGet)
router.post("/CmsUpdate", CmsController.CmsUpdate)



export default router;
