import Provider from "../../../models/provider";
import postLogService from "../../post-log/services";
import postRepository from "../repository";
const db = Provider.getInstance();

/**
 * @description user creates a post
 * @param body
 * @returns
 */
const createPost = async (body: any) => {
  const post = await postRepository.create(body);
  return post;
};

/**
 * @description user fetches all posts on newsfeed
 * @returns
 */
const getAllPosts = async () => {
  const post = await postRepository.find();
  return post;
};

/**
 * @description gets single post
 * @param id
 * @returns
 */
const getPostById = async (id: any) => {
  const post = await postRepository.findById(id);
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
  const post = await postRepository.findByIdAndUpdate(id, body);
  return post;
};

/**
 * hard or soft delete a post, hard delete comments too
 * @param id
 * @param hardDelete
 * @returns
 */
const deletePostById = async (id: any, hardDelete: boolean = false) => {
  let post;
  if (!hardDelete) {
    post = await postRepository.findByIdAndSoftDelete(id);
  } else {
    post = await postRepository.findByIdAndDelete(id);
  }
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
