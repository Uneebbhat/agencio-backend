import mongoose, { Schema, Model } from "mongoose";
import { IChat } from "../interfaces";

const ChatModel: Schema<IChat> = new Schema(
  {
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "ai"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", ChatModel);

export default Chat;
