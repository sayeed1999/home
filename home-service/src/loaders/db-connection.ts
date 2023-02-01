import mongoose from "mongoose";
import config from "../config";

// Connect to MongoDB
const establishDbConnection = () => {
  const connectionString: string = config.DATABASE_URL;
  mongoose
    .connect(connectionString, {})
    .then(() => console.log("# MongoDB connected successfully..."))
    .catch((error) => console.error(error));
};

export default establishDbConnection;

// Export the mongoose connection
// export default mongoose.connection;
