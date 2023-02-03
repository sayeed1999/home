import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Provider from "./provider";
const db = Provider.getInstance();

export interface IPost extends mongoose.Document {
  user: any;
  message: string;
  image: string;
  likes: any[];
  dislikes: any[];
  comment_count: number;
}

export const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// PostSchema.post("remove", function (document) {
//   db.Comment.deleteMany({ post: document._id });
// });

export default mongoose.model<IPost>("Post", PostSchema);
