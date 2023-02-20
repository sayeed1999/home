import Provider from "../../../models/provider";
const db = Provider.getInstance();

const create = async (body: any) => {
  const comment = await db.Comment.create(body);
  return comment;
};

const getAll = async () => {
  const comments = await db.Comment.find();
  return comments;
};

const findById = async (id: any) => {
  const comment = await db.Comment.findById(id);
  return comment;
};

const findByIdAndUpdate = async (id: any, body: any) => {
  const comment = await db.Comment.findByIdAndUpdate(id, body);
  return comment;
};

const findByIdAndDelete = async (id: any) => {
  const comment = await db.Comment.findByIdAndDelete(id);
  return comment;
};

export default {
  create,
  getAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
