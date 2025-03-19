import { Router } from "express";
import {
  createAgency,
  getAgency,
} from "../controllers/agencyController.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router
  .post("/v1/create-agency", upload.single("agencyLogo"), createAgency)
  .get("/v1/get-agency/:agencyId", getAgency);

export default router;
