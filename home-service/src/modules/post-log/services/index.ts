import Provider from "../../../models/provider";
const db = Provider.getInstance();

const createLog = async (body: any) => {
  const temp = JSON.parse(JSON.stringify(body));
  temp.post_id = temp._id;
  delete temp._id;
  const post = await db.PostLog.create(temp);
  return post;
};

const getAllLogs = async () => {
  const post = await db.PostLog.find();
  return post;
};

const getLogById = async (id: any) => {
  const post = await db.PostLog.findById(id);
  return post;
};

const deleteLogById = async (id: any) => {
  const post = await db.PostLog.findByIdAndDelete(id);
  return post;
};

export default {
  createLog,
  getAllLogs,
  getLogById,
  deleteLogById,
};
