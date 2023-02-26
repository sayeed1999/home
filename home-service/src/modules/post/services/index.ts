import { IPost } from "../../../models/post.model";
import { IUser } from "../../../models/user.model";
import postRepository from "../repository";
import commentRepository from "../../comment/repository";
import postLogService from "../../post-log/services";
import CustomError from "../../../utils/errors/custom-error";

/**
 * @description user creates a post
 * @param body
 * @returns
 */
const createPost = async (user: IUser, body: IPost) => {
  body.user = user._id; // current user is writing the post
  const post = await postRepository.create(body);
  // insert log
  postLogService.create(post);
  return post;
};

/**
 * @description admin sees all posts included deleted
 * @returns
 */
const getAllPostsForAdmin = async () => {
  const post = await postRepository.findAll();
  return post;
};

/**
 * @description user fetches all posts for newsfeed
 * @returns
 */
const getAllPostsForUser = async () => {
  const post = await postRepository.findAll({
    showDeleted: false,
    commentsCount: 3,
    limit: 10,
    skip: 0,
  });
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
  const comments = await commentRepository.findAll({ post: id });
  return comments;
};

/**
 * @description updates a post
 * @param id
 * @param body
 * @returns
 */
const updatePostById = async (user: IUser, id: any, body: IPost) => {
  body.user = user._id; // current user is writing the post
  body._id = id;

  let post = await getPostById(body._id);

  if (user._id.toString() !== post?.user.toString())
    throw new CustomError("Cannot edit other user's post", 403);

  post = await postRepository.updateById(body._id, body);
  // insert log
  postLogService.create(post);
  return post;
};

/**
 * hard or soft delete a post, hard delete comments too
 * @param id
 * @param hardDelete
 * @returns
 */
const deletePostById = async (
  user: IUser,
  id: any,
  hardDelete: boolean = false
) => {
  let post = await getPostById(id);

  if (user._id.toString() !== post?.user.toString())
    throw new CustomError("Cannot delete other user's post", 403);

  if (!hardDelete) {
    post = await softDelete(id);
    // insert log for soft delete
    postLogService.create(post);
  } else {
    post = await postRepository.deleteById(id);
  }
  return post;
};

const softDelete = async (id: any) => {
  let body = {
    deletedAt: new Date(),
  };
  const post = await postRepository.updateById(id, body);
  return post;
};

const undoDelete = async (user: IUser, id: any) => {
  let post = await getPostById(id);

  if (!post?.deletedAt)
    throw new CustomError("Post is not in recycle bin", 400);

  if (user._id.toString() !== post?.user.toString())
    throw new CustomError("Cannot undo delete other user's post", 403);

  const body = { deletedAt: null };
  return await postRepository.updateById(id, body);
};

export default {
  createPost,
  getAllPostsForUser,
  getAllPostsForAdmin,
  getPostById,
  getCommentsByPostId,
  updatePostById,
  deletePostById,
  undoDelete,
};
