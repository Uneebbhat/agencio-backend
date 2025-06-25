import { Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import Chat from "../models/ChatModel.model";
import generativeContent from "../services/generativeContent";
import ResponseHandler from "../utils/ResponseHandler";

export const chat = async (req: Request, res: Response): Promise<void> => {
  const { senderId, message } = req.body;

  try {
    if (!senderId || !message) {
      ErrorHandler.send(res, 400, "senderId and message are required.");
      return;
    }

    let chatDoc = await Chat.findOne({ senderId });

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    const aiContent = await generativeContent({ prompt: message });

    const aiMessage = {
      role: "ai",
      content: aiContent,
      timestamp: new Date(),
    };

    const newMessages = [userMessage, aiMessage];

    if (!chatDoc) {
      chatDoc = await Chat.create({
        senderId,
        messages: newMessages,
      });
      // Ensure that the types of role and content match the schema
      // If chatDoc already exists, push new messages with correct types
    } else {
      // Ensure each message has the correct type for 'role' and 'content'
      const formattedMessages = newMessages.map((msg) => ({
        role: msg.role as "user" | "ai",
        content: String(msg.content),
        timestamp: msg.timestamp,
      }));
      chatDoc.messages.push(...formattedMessages);
      await chatDoc.save();
    }

    ResponseHandler.send(res, 201, "Chat updated", { messages: newMessages });
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId } = req.params;
    let chatHistory;

    if (senderId) {
      chatHistory = await Chat.findOne({ senderId });
      if (!chatHistory) {
        ErrorHandler.send(res, 404, "No chat found for this user");
        return;
      }
    } else {
      chatHistory = await Chat.find();
      if (!chatHistory) {
        ErrorHandler.send(res, 404, "No chats found");
        return;
      }
    }

    ResponseHandler.send(res, 200, "Chats found", chatHistory);
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};
