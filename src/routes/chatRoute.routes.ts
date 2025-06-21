import { Router } from "express";
import { chat, getChat } from "../controllers/chatController.controller";

const router = Router();

router.post("/v1/chat", chat);
router.get("/v1/chat-history/:senderId", getChat);

export default router;
