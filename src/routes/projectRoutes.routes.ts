import { Router } from "express";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectController.controller";

const router = Router();

router
  .post("/v1/create-project", createProject)
  .get("/v1/get-all-projects", getAllProjects);

export default router;
