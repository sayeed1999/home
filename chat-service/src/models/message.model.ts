import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MessageSchema = new Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export default mongoose.model("Message", MessageSchema);
