import Provider from "../../../models/provider";
const db = Provider.getInstance();

const createPost = async (body: any) => {
  const post = await db.Post.create(body);
  return post;
};
const getAllPosts = async () => {
  async (req: any, res: any, next: any) => {
    const post = await db.Post.find();
    return post;
  };
};
const getPostById = async (id: any) => {
  async (req: any, res: any, next: any) => {
    const post = await db.Post.findById(id);
    return post;
  };
};
const updatePostById = async (id: any, body: any) => {
  const post = await db.Post.findByIdAndUpdate(id, body);
  return post;
};
const deletePostById = async (id: any) => {
  const post = await db.Post.findByIdAndDelete(id);
  return post;
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
