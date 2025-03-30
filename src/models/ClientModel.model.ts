import mongoose, { Schema, Model } from "mongoose";
import { ClientStatus, IClient } from "../interfaces";

const ClientModel: Schema<IClient> = new Schema(
  {
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
      required: [true, "Agency ID is required"],
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
    },
    clientEmail: {
      type: String,
      required: [true, "Client email is required"],
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      required: [true, "Client status is required"],
      enum: Object.values(ClientStatus),
      default: ClientStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const Client: Model<IClient> = mongoose.model<IClient>("Client", ClientModel);

export default Client;
