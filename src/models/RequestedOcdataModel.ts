import mongoose, { Schema } from "mongoose";

const RequestedOcDataSchema = new Schema({
  mainHandData: [String],
  offHandData: [String],
  headData: [String],
  armorData: [String],
  shoeData: [String],
});

const RequestedOcData =
  mongoose.models.RequestedOcData ||
  mongoose.model("RequestedOcData", RequestedOcDataSchema);

export default RequestedOcData;
