import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IPost extends mongoose.Document {
  user: any;
  message: string;
  image: string;
  likes: any[];
  dislikes: any[];
  comment_count: number;
}

const PostSchema = new Schema(
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
    comment_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>("Post", PostSchema);
