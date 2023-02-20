import Provider from "../../../models/provider";
const db = Provider.getInstance();
import { Schema, model, Types, Model } from "mongoose";
import CustomError from "../../../utils/errors/custom-error";

const create = async (body: any) => {
  const post = await db.Post.create(body);
  return post;
};

const addCommentToPost = async (
  postId: Types.ObjectId,
  commentId: Types.ObjectId
) => {
  const post = await db.Post.findById(postId);
  if (!post) throw new CustomError("Post not found", 400);
  post.comments.push(commentId);
  await post.save();
  return post;
};

const find = async ({
  showDeleted = true,
  limit = 100,
  skip = 0,
  commentsCount = 0,
}: {
  showDeleted?: boolean;
  limit?: number;
  skip?: number;
  commentsCount?: number;
} = {}) => {
  // filtering datas
  const filter: any = {};

  if (!showDeleted)
    filter["$or"] = [{ deletedAt: { $exists: false } }, { deletedAt: null }];

  // populating sub-documents
  let populate: any;

  if (commentsCount)
    populate = {
      path: "comments",
      options: { limit: commentsCount },
    };

  let query = db.Post.find(filter).skip(skip).limit(limit).sort({
    createdAt: -1,
  });

  // .populate() must have a path if used..
  if (populate) query = query.populate(populate);

  const post = await query;
  return post;
};

const findById = async (id: any) => {
  const post = await db.Post.findById(id).populate("comments");
  return post;
};

const findByIdAndUpdate = async (id: any, body: any) => {
  const post = await db.Post.findByIdAndUpdate(id, body, { new: true });
  return post;
};

const findByIdAndDelete = async (id: any) => {
  const post = await db.Post.findByIdAndDelete(id);
  return post;
};

export default {
  create,
  addCommentToPost,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
