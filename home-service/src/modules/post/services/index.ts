import Provider from "../../../models/provider";
import postLogService from "../../post-log/services";
const db = Provider.getInstance();

/**
 * @description user creates a post
 * @param body
 * @returns
 */
const createPost = async (body: any) => {
  const post = await db.Post.create(body);
  postLogService.createLog(post);
  return post;
};

/**
 * @description user fetches all posts on newsfeed
 * @returns
 */
const getAllPosts = async () => {
  const post = await db.Post.find({
    $or: [{ deletedAt: { exists: false } }, { deletedAt: null }],
  }).populate({
    path: "comments",
    options: { limit: 3 },
  });
  return post;
};

/**
 * @description gets single post
 * @param id
 * @returns
 */
const getPostById = async (id: any) => {
  const post = await db.Post.findById(id).populate("comments");
  return post;
};

/**
 * @description gets all comments for a specific post
 * @param id
 * @returns
 */
const getCommentsByPostId = async (id: any) => {
  const comments = await db.Comment.find({ post: id });
  return comments;
};

/**
 * @description updates a post
 * @param id
 * @param body
 * @returns
 */
const updatePostById = async (id: any, body: any) => {
  const post = await db.Post.findByIdAndUpdate(id, body);
  postLogService.createLog(post);
  return post;
};

/**
 * hard or soft delete a post, hard delete comments too
 * @param id
 * @returns
 */
const deletePostById = async (id: any, hardDelete: boolean = false) => {
  // change the code here
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
