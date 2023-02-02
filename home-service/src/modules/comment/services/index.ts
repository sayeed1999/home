import Provider from "../../../models/provider";
const db = Provider.getInstance();

const createComment = async (body: any) => {
  const post = await db.Comment.create(body);
  return post;
};
const getCommentById = async (id: any) => {
  const post = await db.Comment.findById(id);
  return post;
};
const updateCommentById = async (id: any, body: any) => {
  const post = await db.Comment.findByIdAndUpdate(id, body);
  return post;
};
const deleteCommentById = async (id: any) => {
  const post = await db.Comment.findByIdAndDelete(id);
  return post;
};

export default {
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
