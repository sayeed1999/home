import Provider from "../../../models/provider";
const db = Provider.getInstance();

const createComment = async (body: any) => {
  const post = await db.Comment.create(body);
  return post;
};
const getAllComments = async () => {
  async (req: any, res: any, next: any) => {
    const post = await db.Comment.find();
    return post;
  };
};
const getCommentById = async (id: any) => {
  async (req: any, res: any, next: any) => {
    const post = await db.Comment.findById(id);
    return post;
  };
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
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
