import Provider from "../../../models/provider";
const db = Provider.getInstance();

const create = async (body: any) => {
  const post = await db.Post.create(body);
  return post;
};

const find = async () => {
  const post = await db.Post.find({
    $or: [{ deletedAt: { exists: false } }, { deletedAt: null }],
  }).populate({
    path: "comments",
    options: { limit: 3 },
  });
  return post;
};

const findById = async (id: any) => {
  const post = await db.Post.findById(id).populate("comments");
  return post;
};

const findByIdAndUpdate = async (id: any, body: any) => {
  const post = await db.Post.findByIdAndUpdate(id, body);
  return post;
};

const findByIdAndSoftDelete = async (id: any) => {
  let body = {
    deletedAt: Date.now(),
  };
  const post = await db.Post.findByIdAndUpdate(id, body, { new: true });
  return post;
};

const findByIdAndDelete = async (id: any) => {
  const post = await db.Post.findByIdAndDelete(id);
  return post;
};

export default {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findByIdAndSoftDelete,
};
