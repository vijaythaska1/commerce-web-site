import express from "express";
import UserControlller from "../controller/UserControlller.js";

const router = express.Router();

router.post("/UserCreate", UserControlller.UserCreate)

export default router;
