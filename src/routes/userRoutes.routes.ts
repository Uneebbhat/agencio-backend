import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/userController.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router
  .post("/v1/signup", upload.single("profilePic"), signup)
  .post("/v1/login", login)
  .post("/v1/logout", logout)
  .post("/v1/forgot-password", forgotPassword)
  .post("/v1/reset-password/:token", resetPassword);

export default router;
