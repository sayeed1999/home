import { ObjectId } from "mongoose";
import commentRepository from "../repository";
import postRepository from "../../post/repository";
import { IUser } from "../../../models/user.model";
import { IComment } from "../../../models/comment.model";

const createComment = async (
  user: IUser,
  post_id: ObjectId | string,
  body: IComment
) => {
  body.user = user._id; // current user is writing the comment
  body.post = post_id;
  const comment = await commentRepository.create(body);
  await postRepository.addCommentToPost(body.post, comment._id);
  return comment;
};

const getComments = async () => {
  const comments = await commentRepository.getAll();
  return comments;
};

const getCommentById = async (id: any) => {
  const comment = await commentRepository.findById(id);
  return comment;
};

const updateCommentById = async (id: any, body: any) => {
  const comment = await commentRepository.findByIdAndUpdate(id, body);
  return comment;
};
const deleteCommentById = async (id: any) => {
  const comment = await commentRepository.findByIdAndDelete(id);
  return comment;
};

export default {
  getComments,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
