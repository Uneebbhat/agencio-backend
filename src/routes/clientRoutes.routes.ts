import { Router } from "express";
import {
  createClient,
  deleteClient,
  getAllClients,
} from "../controllers/clientController.controller";

const router = Router();

router
  .post("/v1/create-client", createClient)
  .get("/v1/get-clients", getAllClients)
  .delete("/v1/delete-client", deleteClient);

export default router;
