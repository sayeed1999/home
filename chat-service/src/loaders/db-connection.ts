import mongoose from "mongoose";
import config from "../config";

// Connect to MongoDB
export const establishDbConnection = () => {
  const connectionString: string = config.DATABASE_URL;

  mongoose
    .connect(connectionString, {})
    .then(() => console.log("# MongoDB connected successfully..."))
    .catch((error) => console.error(error));
};

/**
 * this code will not return undefined for accessing before initialization,
 * because the default export is not undefined, but a well-defined object
 * from mongoose library.
 */
// Export the mongoose connection
export default mongoose.connection;
