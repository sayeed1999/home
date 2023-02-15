import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    conversation_type: {
      type: Number,
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
