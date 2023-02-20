import { NextFunction } from "express";
import mongoose from "mongoose";
import Comment from "./comment.model";
import PostLog from "./post-log.model";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types; // couldnt use it in inteface types

export interface IPost extends mongoose.Document {
  _id: any;
  user: any;
  message: string;
  image: string;
  likes: any[];
  dislikes: any[];
  comments: any[];
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

/**
 * Implementing cascade deletion of comments
 */
const cascadeDelete = async function (this: any, next: any) {
  // retrieving the model first
  const posts = await this.model.find(this.getFilter());
  console.log(posts.length);
  for (let i = 0; posts[i]; i++) {
    const post = posts[i];
    await Comment.deleteMany({ post: post._id });
    await PostLog.deleteMany({ post_id: post._id });
  }
  next();
};

/**
 * Implement log insertion for CRUD on posts
 */
const insertLog = async function (doc: any, next: NextFunction) {
  const temp = JSON.parse(JSON.stringify(doc));
  temp.post_id = temp._id;
  delete temp._id;
  PostLog.create(temp);
  next();
};

PostSchema.pre("remove", { document: false, query: true }, cascadeDelete);

PostSchema.post("save", insertLog);
PostSchema.post("findOneAndUpdate", insertLog);

export default mongoose.model<IPost>("Post", PostSchema);
