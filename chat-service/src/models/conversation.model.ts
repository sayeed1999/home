import mongoose from "mongoose";
import { ConversationType } from "../utils/enums";
import { MessageSchema } from "./message.model";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    conversation_type: {
      type: Number,
      enum: Object.values(ConversationType),
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
