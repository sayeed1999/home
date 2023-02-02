import Provider from "../../../models/provider";
import postLogService from "../../post-log/services";
const db = Provider.getInstance();

const createPost = async (body: any) => {
  const post = await db.Post.create(body);
  postLogService.createLog(post);
  return post;
};

const getAllPosts = async () => {
  const post = await db.Post.find().populate({
    path: "comments",
    options: { limit: 3 },
  });
  return post;
};

const getPostById = async (id: any) => {
  const post = await db.Post.findById(id).populate("comments");
  return post;
};

const getCommentsByPostId = async (id: any) => {
  const comments = await db.Comment.find({ post: id });
  return comments;
};

const updatePostById = async (id: any, body: any) => {
  const post = await db.Post.findByIdAndUpdate(id, body);
  postLogService.createLog(post);
  return post;
};

const deletePostById = async (id: any) => {
  const post = await db.Post.findByIdAndDelete(id);
  postLogService.createLog(post);
  return post;
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  getCommentsByPostId,
  updatePostById,
  deletePostById,
};
