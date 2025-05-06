import { Router } from "express";
import { createProject } from "../controllers/projectController.controller";

const router = Router();

router.post("/v1/create-project", createProject);

export default router;
