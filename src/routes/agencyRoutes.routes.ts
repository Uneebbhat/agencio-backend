import { Router } from "express";
import {
  createAgency,
  getAgency,
} from "../controllers/agencyController.controller";

const router = Router();

router
  .post("/v1/create-agency", createAgency)
  .get("/v1/get-agency/:agencyId", getAgency);

export default router;
