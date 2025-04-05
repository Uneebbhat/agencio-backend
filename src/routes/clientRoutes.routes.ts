import { Router } from "express";
import {
  createClient,
  deleteClient,
  editClient,
  getAllClients,
} from "../controllers/clientController.controller";

const router = Router();

router
  .post("/v1/create-client", createClient)
  .get("/v1/get-clients", getAllClients)
  .put("/v1/edit-client", editClient)
  .delete("/v1/delete-client", deleteClient);

export default router;
