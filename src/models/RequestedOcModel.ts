import mongoose, { Schema } from "mongoose";

const RequestedOcSchema = new Schema(
  {
    userId: { type: String },
    userName: { type: String },
    mainHand: { type: String },
    offHand: { type: String },
    head: { type: String },
    armor: { type: String },
    shoe: { type: String },
    reqStatus: {
        type: String,
        default: "processing", // Set the default value for reqStatus
      },
  },
  { timestamps: true }
);

const RequestedOcS =
  mongoose.models.requestedOcs ||
  mongoose.model("requestedOcs", RequestedOcSchema);
export default RequestedOcS;
