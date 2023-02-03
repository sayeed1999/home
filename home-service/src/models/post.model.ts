import mongoose from "mongoose";
import Comment from "./comment.model";
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

const cascadeDelete = async function (this: any, next: any) {
  // retrieving the model first
  const posts = await this.model.find(this.getFilter());

  for (let i = 0; posts[i]; i++) {
    const post = posts[i];
    await Comment.deleteMany({ post: post._id });
  }
  next();
};

PostSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  cascadeDelete
);

PostSchema.pre("deleteOne", { document: false, query: true }, cascadeDelete);
PostSchema.pre("deleteMany", { document: false, query: true }, cascadeDelete);
PostSchema.pre("remove", { document: false, query: true }, cascadeDelete);

// PostSchema.post("findOneAndDelete", async function (document) {
//   await Comment.deleteMany({ post: document._id });
// });

export default mongoose.model<IPost>("Post", PostSchema);
