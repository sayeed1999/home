import mongoose from "mongoose";
import { ConversationType } from "../utils/enums";
import { MessageSchema } from "./message.model";

const Schema = mongoose.Schema;

export interface IConversation extends mongoose.Document {
  conversation_type: Number;
  participants: any[];
  messages: any[];
}

const ConversationSchema = new Schema(
  {
    conversation_type: {
      type: Number,
      enum: [ConversationType.Duo, ConversationType.Group],
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

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
