const commentRepository = require("../repository");

const createComment = async (body: any) => {
  const comment = await commentRepository.create(body);
  return comment;
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
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
