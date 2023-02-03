import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IComment extends mongoose.Document {
  _id: any;
  user: any;
  post: any;
  message: string;
  image: string;
  likes: any[];
  dislikes: any[];
}

const CommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
